import Link from "next/link";
import { Hospital, LayoutDashboard, FilePlus, Bell, BarChart, Database } from "lucide-react";
import { UserNav } from "./user-nav";
import { Button } from "../ui/button";

export function MainHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <Hospital className="h-6 w-6 text-primary" />
            <span className="inline-block font-bold font-headline">PathoTrace</span>
          </Link>
          <nav className="flex gap-6">
            <Link
              href="/dashboard"
              className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              <LayoutDashboard className="mr-2 h-4 w-4" />
              Dashboard
            </Link>
            <Link
              href="/data-entry"
              className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              <FilePlus className="mr-2 h-4 w-4" />
              Data Entry
            </Link>
             <Link
              href="/data-entry/logs"
              className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              <Database className="mr-2 h-4 w-4" />
              Logs
            </Link>
            <Link
              href="/analytics"
              className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              <BarChart className="mr-2 h-4 w-4" />
              Analytics
            </Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
          </Button>
          <UserNav />
        </div>
      </div>
    </header>
  );
}
