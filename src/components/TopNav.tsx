
import { useState } from "react";
import { Bell, Menu, Search } from "lucide-react";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import SideNav from "./SideNav";

interface TopNavProps {
  title?: string;
}

const TopNav = ({ title = "Splitly" }: TopNavProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed top-0 left-0 right-0 z-40 bg-card/80 glass-morphism h-16 flex items-center justify-between px-4">
      <div className="flex items-center">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <button className="mr-3 text-foreground md:hidden">
              <Menu size={24} />
            </button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] bg-card p-0">
            <SideNav onItemClick={() => setIsOpen(false)} />
          </SheetContent>
        </Sheet>
        <div className="flex items-center space-x-2">
          <img src="/lovable-uploads/c27b7c53-d89e-4960-898e-b094e61e9641.png" alt="Splitly Logo" className="h-8 w-8" />
          <h1 className="text-xl font-semibold">{title}</h1>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <button className="text-foreground">
          <Search size={22} />
        </button>
        <button className="text-foreground relative">
          <Bell size={22} />
          <span className="absolute -top-1 -right-1 bg-primary text-xs text-primary-foreground rounded-full w-4 h-4 flex items-center justify-center">
            3
          </span>
        </button>
      </div>
    </div>
  );
};

export default TopNav;
