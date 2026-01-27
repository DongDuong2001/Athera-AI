import { Button } from "./ui/button";
import Link from "next/link";
import { getSession } from "@/utils/auth";
import NotificationPopover from "./notification-popover";
import UserNav from "./user-nav";

export default async function NavbarActions() {
  const user = await getSession();

  return (
    <>
      {user ? (
        <div className="flex items-center gap-4">
          <NotificationPopover />
          <UserNav user={user} />
        </div>
      ) : (
        <Link href="/sign-in">
          <Button className="bg-[#07304A] hover:bg-[#34C0FC] text-white">
            Sign In
          </Button>
        </Link>
      )}
    </>
  );
}
