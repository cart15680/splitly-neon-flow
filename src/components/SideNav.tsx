
import { Link, useNavigate } from "react-router-dom";
import { Home, ShoppingCart, CreditCard, History, User, Settings, HelpCircle, LogOut, Scan } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface SideNavProps {
  onItemClick?: () => void;
}

const SideNav = ({ onItemClick = () => {} }: SideNavProps) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // In a real app, you would clear auth tokens, user data, etc.
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account",
    });
    navigate("/login");
    onItemClick();
  };

  return (
    <div className="h-full w-full bg-card border-r border-border overflow-auto">
      <div className="p-6 border-b border-border flex items-center gap-4">
        <img src="/lovable-uploads/c27b7c53-d89e-4960-898e-b094e61e9641.png" alt="Splitly Logo" className="h-10 w-10" />
        <h1 className="text-xl font-bold text-foreground">Splitly</h1>
      </div>

      <div className="p-4">
        <div className="flex flex-col space-y-1">
          <NavItem icon={<Home />} label="Home" path="/dashboard" onClick={onItemClick} />
          <NavItem icon={<ShoppingCart />} label="Shop" path="/shop" onClick={onItemClick} />
          <NavItem icon={<Scan />} label="Scan to Pay" path="/scan" onClick={onItemClick} />
          <NavItem icon={<CreditCard />} label="BNPL" path="/bnpl" onClick={onItemClick} />
          <NavItem icon={<History />} label="Transaction History" path="/history" onClick={onItemClick} />
          <NavItem icon={<User />} label="Profile" path="/profile" onClick={onItemClick} />
          <NavItem icon={<Settings />} label="Settings" path="/settings" onClick={onItemClick} />
          <NavItem icon={<HelpCircle />} label="Support" path="/support" onClick={onItemClick} />
        </div>

        <div className="mt-8 pt-6 border-t border-border">
          <h3 className="text-sm text-muted-foreground mb-4">My Account</h3>
          <div className="flex flex-col space-y-1">
            {/* Removed notification link */}
            <button 
              className="flex items-center gap-3 py-2 px-3 rounded-lg text-destructive hover:bg-muted transition-colors"
              onClick={handleLogout}
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-0 right-0 px-4">
        <div className="bg-muted/30 p-4 rounded-lg">
          <p className="text-sm text-muted-foreground mb-2">Need help?</p>
          <Link 
            to="/support" 
            className="text-primary font-medium text-sm" 
            onClick={onItemClick}
          >
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
};

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  path: string;
  onClick?: () => void;
}

const NavItem = ({ icon, label, path, onClick }: NavItemProps) => {
  return (
    <Link
      to={path}
      className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-muted transition-colors"
      onClick={onClick}
    >
      <span className="text-muted-foreground">{icon}</span>
      <span>{label}</span>
    </Link>
  );
};

export default SideNav;
