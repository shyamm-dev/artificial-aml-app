import { auth, signIn } from "@/auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";

export default async function Home() {
  const session = await auth();
  const user = session?.user;

  return (
    <div>
      {user ? (
        <div>
          <h1 className="text-2xl font-bold">Welcome, {user.name}</h1>
          <p>You are logged in.</p>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center h-screen -mt-16">
          <h1 className="text-4xl font-bold mb-4">Artificial AML</h1>
          <Card className="w-full max-w-sm">
            <CardContent className="pt-6">
              <form
                action={async () => {
                  "use server";
                  await signIn("atlassian");
                }}
              >
                <Button type="submit" className="w-full">
                  Sign in with Atlassian
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
