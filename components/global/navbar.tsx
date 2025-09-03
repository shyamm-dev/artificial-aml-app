import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { ModeToggle } from "../theme-toggle";
import { LogOut } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

async function Navbar() {
  const session = await auth();
  const user = session?.user;
  console.log("Navbar session:", session);

  return (
    <header className="bg-black text-white p-4">
      <nav className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          Logo
        </Link>
        <div className="flex items-center gap-4">
          <ModeToggle />
          {user ? (
            <div className="flex items-center gap-4 justify-end">
              <HoverCard>
                <HoverCardTrigger asChild>
                  {user.image && (
                    <Image
                      src={user.image}
                      alt={user.name ?? "User avatar"}
                      width={32}
                      height={32}
                      className="rounded-full cursor-pointer"
                    />
                  )}
                </HoverCardTrigger>
                <HoverCardContent className="w-80 z-50">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-semibold">Connected to Atlassian</p>
                    <p className="text-sm">Name: {user.name}</p>
                    <p className="text-sm">Email: {user.email}</p>
                  </div>
                </HoverCardContent>
              </HoverCard>
              <form
                action={async () => {
                  "use server";
                  await signOut();
                }}
              >
                <Button type="submit" variant="ghost">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </form>
            </div>
          ) : null}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
