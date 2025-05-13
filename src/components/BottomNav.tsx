
import { ShoppingCart, CreditCard, History, User, Scan } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const BottomNav = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border glass-morphism h-16 md:hidden">
      <div className="flex justify-around items-center h-full">
        <NavItem path="/shop" label="Shop" isActive={isActive("/shop")} icon={<ShoppingCart size={22} />} />
        <NavItem path="/bnpl" label="BNPL" isActive={isActive("/bnpl")} icon={<CreditCard size={22} />} />
        <NavItem 
          path="/scan" 
          label="Scan" 
          isActive={isActive("/scan")} 
          icon={<Scan size={28} />} 
          highlight={true}
        />
        <NavItem path="/history" label="History" isActive={isActive("/history")} icon={<History size={22} />} />
        <NavItem path="/profile" label="Profile" isActive={isActive("/profile")} icon={<User size={22} />} />
      </div>
    </div>
  );
};

interface NavItemProps {
  path: string;
  label: string;
  isActive: boolean;
  icon: React.ReactNode;
  highlight?: boolean;
}

const NavItem = ({ path, label, isActive, icon, highlight = false }: NavItemProps) => (
  <Link
    to={path}
    className={`flex flex-col items-center justify-center w-full h-full transition-all ${
      isActive ? "text-primary" : "text-muted-foreground"
    }`}
  >
    <div className={highlight ? "bg-primary text-primary-foreground p-3 rounded-full -mt-6 shadow-lg" : ""}>
      {icon}
    </div>
    <span className={`text-xs mt-1 ${highlight ? "-mt-1" : ""}`}>{label}</span>
    {isActive && !highlight && <div className="absolute bottom-0 w-6 h-1 rounded-t-md bg-primary" />}
  </Link>
);

export default BottomNav;
