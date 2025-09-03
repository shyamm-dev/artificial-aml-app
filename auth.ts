import NextAuth from "next-auth";
import Atlassian from "next-auth/providers/atlassian";

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
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.expiresAt = account.expires_at;
      }
      return token;
    },
  },
});
