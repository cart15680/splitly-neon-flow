
import { ReactNode } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { 
  Home, 
  Package, 
  ShoppingCart, 
  BarChart2, 
  DollarSign, 
  User, 
  Settings, 
  HelpCircle, 
  LogOut, 
  Menu
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { toast } from "@/hooks/use-toast";

interface SellerLayoutProps {
  children: ReactNode;
  title?: string;
}

const navItems = [
  { icon: Home, label: "Dashboard", path: "/seller/dashboard" },
  { icon: Package, label: "Products", path: "/seller/products" },
  { icon: ShoppingCart, label: "Orders", path: "/seller/orders" },
  { icon: BarChart2, label: "Analytics", path: "/seller/analytics" },
  { icon: DollarSign, label: "Financials", path: "/seller/financials" },
  { icon: User, label: "Profile", path: "/seller/profile" },
  { icon: Settings, label: "Settings", path: "/seller/settings" },
  { icon: HelpCircle, label: "Support", path: "/seller/support" },
];

const SellerLayout = ({ children, title = "Seller Dashboard" }: SellerLayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();

  // Mock seller data
  const seller = {
    name: "Merchant Store",
    email: "store@example.com",
    avatar: "https://api.dicebear.com/6.x/shapes/svg?seed=store",
  };
  
  const handleLogout = () => {
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account",
    });
    navigate("/login");
  };
  
  // Sidebar content component for reuse
  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo and header */}
      <div className="p-4 border-b border-border">
        <Link to="/seller/dashboard" className="flex items-center gap-2">
          <img 
            src="/lovable-uploads/c27b7c53-d89e-4960-898e-b094e61e9641.png" 
            alt="Splitly Logo" 
            className="w-8 h-8"
          />
          <span className="font-bold text-xl">Splitly Seller</span>
        </Link>
      </div>
      
      {/* Navigation items */}
      <div className="flex-1 overflow-auto py-4">
        <nav className="space-y-1 px-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => isMobile && setIsOpen(false)}
                className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                  isActive 
                    ? "bg-primary text-primary-foreground" 
                    : "hover:bg-muted/50 text-muted-foreground"
                }`}
              >
                <item.icon size={18} />
                <span>{item.label}</span>
                {isActive && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-background" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>
      
      {/* User profile */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9">
            <AvatarImage src={seller.avatar} />
            <AvatarFallback>{seller.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <p className="font-medium text-sm">{seller.name}</p>
            <p className="text-xs text-muted-foreground">{seller.email}</p>
          </div>
          <Button variant="ghost" size="icon" className="text-destructive" onClick={handleLogout}>
            <LogOut size={18} />
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex bg-background">
      {/* Desktop sidebar */}
      <div className="hidden md:block md:w-64 bg-card border-r border-border">
        <SidebarContent />
      </div>

      {/* Mobile navigation */}
      <div className="md:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              className="fixed top-4 left-4 z-40"
            >
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <SidebarContent />
          </SheetContent>
        </Sheet>
      </div>

      {/* Main content */}
      <div className="flex-1">
        {/* Header */}
        <header className="h-16 border-b border-border flex items-center justify-between px-4 md:px-6 sticky top-0 bg-background/80 backdrop-blur-sm z-30 mt-0 pt-0">
          <h1 className="text-xl font-semibold ml-12 md:ml-0">{title}</h1>
          
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" onClick={handleLogout} className="flex items-center">
              <LogOut size={16} className="mr-2" />
              Logout
            </Button>
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 md:p-6 pb-24 overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
};

export default SellerLayout;
