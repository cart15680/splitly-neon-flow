
import { useState } from "react";
import { Bell, Menu, Search } from "lucide-react";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import SideNav from "./SideNav";
import { toast } from "@/hooks/use-toast";

interface TopNavProps {
  title?: string;
}

const TopNav = ({ title = "Splitly" }: TopNavProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleNotificationClick = () => {
    toast({
      title: "Notifications",
      description: "You have 3 unread notifications",
    });
  };

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
        <Popover>
          <PopoverTrigger asChild>
            <button className="text-foreground relative" onClick={handleNotificationClick}>
              <Bell size={22} />
              <span className="absolute -top-1 -right-1 bg-primary text-xs text-primary-foreground rounded-full w-4 h-4 flex items-center justify-center">
                3
              </span>
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-0">
            <div className="p-4 border-b">
              <h3 className="font-semibold">Notifications</h3>
            </div>
            <div className="max-h-[300px] overflow-auto">
              <div className="p-3 border-b hover:bg-muted/50 cursor-pointer">
                <p className="text-sm font-medium">Payment Received</p>
                <p className="text-xs text-muted-foreground">You received QAR 500 from Ahmed</p>
                <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
              </div>
              <div className="p-3 border-b hover:bg-muted/50 cursor-pointer">
                <p className="text-sm font-medium">EMI Due</p>
                <p className="text-xs text-muted-foreground">Your next EMI payment of QAR 1,200 is due tomorrow</p>
                <p className="text-xs text-muted-foreground mt-1">5 hours ago</p>
              </div>
              <div className="p-3 border-b hover:bg-muted/50 cursor-pointer">
                <p className="text-sm font-medium">Order Shipped</p>
                <p className="text-xs text-muted-foreground">Your order #54321 has been shipped</p>
                <p className="text-xs text-muted-foreground mt-1">Yesterday</p>
              </div>
            </div>
            <div className="p-2 text-center border-t">
              <button className="text-xs text-primary font-medium">See all notifications</button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default TopNav;
