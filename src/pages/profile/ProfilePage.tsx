
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import {
  ChevronRight,
  CreditCard,
  UserIcon,
  Building,
  Shield,
  Settings,
  LogOut,
  MapPin,
  Bell,
  HelpCircle,
} from "lucide-react";

const ProfilePage = () => {
  // Mock user data
  const user = {
    name: "Rahul Sharma",
    email: "rahul.sharma@example.com",
    phone: "+91 9876543210",
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=200&h=200",
    kycStatus: "verified", // verified, pending, incomplete
    kycProgress: 100,
    bankStatus: "verified", // verified, pending, not_added
    bankProgress: 100,
    // Credit limit removed
    creditScore: 750,
    address: "123 Main Street, Mumbai, Maharashtra 400001"
  };
  
  const menuItems = [
    {
      icon: <UserIcon className="h-5 w-5 text-primary" />,
      title: "KYC Details",
      description: "Identity verification and KYC status",
      status: user.kycStatus === "verified" ? "Verified" : "Incomplete",
      link: "/kyc"
    },
    {
      icon: <Building className="h-5 w-5 text-primary" />,
      title: "Bank Account",
      description: "Manage linked bank accounts",
      status: user.bankStatus === "verified" ? "Verified" : "Not Added",
      link: "/bank-account"
    },
    {
      icon: <Bell className="h-5 w-5 text-primary" />,
      title: "Notifications",
      description: "Manage alerts and reminders",
      link: "/notifications"
    },
    {
      icon: <Shield className="h-5 w-5 text-primary" />,
      title: "Security",
      description: "Password and authentication",
      link: "/security"
    },
    {
      icon: <Settings className="h-5 w-5 text-primary" />,
      title: "Settings",
      description: "App preferences and account settings",
      link: "/settings"
    },
    {
      icon: <HelpCircle className="h-5 w-5 text-primary" />,
      title: "Help & Support",
      description: "Get help with your account",
      link: "/support"
    }
  ];

  return (
    <Layout title="Profile">
      <div className="p-4 pb-20 md:p-6 space-y-6">
        {/* Profile Card */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16 border-4 border-primary/30">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <h2 className="text-xl font-bold">{user.name}</h2>
                <p className="text-muted-foreground">{user.phone}</p>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
              
              <Link to="/settings">
                <Button variant="outline" size="icon">
                  <Settings className="h-4 w-4" />
                </Button>
              </Link>
            </div>
            
            <div className="mt-6 flex items-center space-x-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">{user.address}</p>
            </div>
          </CardContent>
        </Card>
        
        {/* Profile Menu */}
        <div className="space-y-4">
          {menuItems.map((item, index) => (
            <Link key={index} to={item.link}>
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 rounded-full bg-primary/10">
                        {item.icon}
                      </div>
                      <div>
                        <h3 className="font-medium">{item.title}</h3>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {item.status && (
                        <span className={`text-xs ${
                          item.status === "Verified" ? "text-green-500" : "text-yellow-500"
                        }`}>
                          {item.status}
                        </span>
                      )}
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
        
        {/* Logout Button */}
        <Button 
          variant="destructive" 
          className="w-full"
          onClick={() => {
            // Clear any stored user data
            localStorage.clear();
            sessionStorage.clear();
            // Redirect to login page
            window.location.href = '/login';
          }}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </Layout>
  );
};

export default ProfilePage;
