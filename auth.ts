import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";
import Atlassian from "next-auth/providers/atlassian";

async function refreshAccessToken(token: JWT): Promise<JWT> {
  try {
    const response = await fetch("https://auth.atlassian.com/oauth/token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        grant_type: "refresh_token",
        client_id: process.env.AUTH_ATLASSIAN_ID,
        client_secret: process.env.AUTH_ATLASSIAN_SECRET,
        refresh_token: token.refresh_token,
      }),
    });

    const refreshedTokens = await response.json();

    if (!response.ok)
      throw refreshedTokens;

    return {
      ...token,
      access_token: refreshedTokens.access_token,
      refresh_token: refreshedTokens.refresh_token ?? token.refresh_token,
      expires_at: refreshedTokens.expires_at,
    } as JWT;
  } catch (error) {
    console.error("Error refreshing Atlassian access token", error);

    return {
      ...token,
      error: "RefreshTokenError",
    } as JWT;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Atlassian({
      authorization: {
        params: {
          scope: "read:jira-work write:jira-work read:me offline_access",
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        return {
          ...token,
          access_token: account.access_token,
          refresh_token: account.refresh_token,
          expires_at: account.expires_at
        } as JWT;
      }

      if (Date.now() < token.expires_at * 1000) {
        return token;
      }

      return refreshAccessToken(token);
    },
    async session({ session, token }) {
      session.error = token.error;
      return session;
    },
  },
});