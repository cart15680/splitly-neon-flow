
import { ReactNode } from "react";
import TopNav from "./TopNav";
import BottomNav from "./BottomNav";
import SideNav from "./SideNav";

interface LayoutProps {
  children: ReactNode;
  title?: string;
  showNav?: boolean;
}

const Layout = ({ children, title, showNav = true }: LayoutProps) => {
  return (
    <div className="flex min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <div className="hidden md:block w-64 fixed h-screen">
        <SideNav />
      </div>

      {/* Main Content */}
      <div className="flex-1 md:ml-64">
        {showNav && <TopNav title={title} />}
        <main className={`${showNav ? "pt-16 pb-16 md:pb-0" : ""} min-h-screen`}>
          {children}
        </main>
        {showNav && <BottomNav />}
      </div>
    </div>
  );
};

export default Layout;
