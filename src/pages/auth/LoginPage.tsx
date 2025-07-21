
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";

const LoginPage = () => {
  const navigate = useNavigate();
  const [loginMethod, setLoginMethod] = useState<"email" | "phone">("email");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState<"buyer" | "seller">("buyer");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login (would be API call in real app)
    toast({
      title: "Login Successful",
      description: `Welcome back to Splitly as a ${userType}`,
    });

    // Navigate based on user type
    if (userType === "buyer") {
      navigate("/dashboard");
    } else {
      navigate("/seller/dashboard"); 
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background p-6">
      <div className="flex-1 flex flex-col justify-center items-center">
        <div className="w-full max-w-md">
          {/* Logo and Title */}
          <div className="flex flex-col items-center mb-8">
            <img
              src="/lovable-uploads/c27b7c53-d89e-4960-898e-b094e61e9641.png"
              alt="Splitly Logo"
              className="w-20 h-20 mb-4"
            />
            <h1 className="text-3xl font-bold text-foreground">Welcome to Splitly</h1>
            <p className="text-muted-foreground mt-2">Shop now, pay later</p>
          </div>

          {/* User Type Selector */}
          <Tabs 
            defaultValue="buyer" 
            className="w-full mb-6"
            onValueChange={(value) => setUserType(value as "buyer" | "seller")}
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="buyer">Buyer</TabsTrigger>
              <TabsTrigger value="seller">Seller</TabsTrigger>
            </TabsList>
            <TabsContent value="buyer" className="mt-2 text-center text-sm text-muted-foreground">
              Log in as a buyer to shop and use pay later services
            </TabsContent>
            <TabsContent value="seller" className="mt-2 text-center text-sm text-muted-foreground">
              Log in as a seller to manage your store and products
            </TabsContent>
          </Tabs>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              {/* Toggle between email and phone */}
              <div className="flex rounded-lg bg-muted/20 p-1 mb-4">
                <button
                  type="button"
                  className={`flex-1 py-2 text-sm font-medium rounded-md transition ${
                    loginMethod === "email"
                      ? "bg-card text-foreground shadow-sm"
                      : "text-muted-foreground"
                  }`}
                  onClick={() => setLoginMethod("email")}
                >
                  Email
                </button>
                <button
                  type="button"
                  className={`flex-1 py-2 text-sm font-medium rounded-md transition ${
                    loginMethod === "phone"
                      ? "bg-card text-foreground shadow-sm"
                      : "text-muted-foreground"
                  }`}
                  onClick={() => setLoginMethod("phone")}
                >
                  Phone
                </button>
              </div>

              {loginMethod === "email" ? (
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="Enter your phone number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="password">Password</Label>
                <Link to="/forgot-password" className="text-xs text-primary hover:underline">
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute right-3 top-3 text-muted-foreground"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full neon-glow"
            >
              Log In as {userType === "buyer" ? "Buyer" : "Seller"}
            </Button>

            {/* Social Login */}
            <div className="relative flex items-center justify-center mt-8 mb-4">
              <div className="border-t border-border w-full"></div>
              <span className="absolute bg-background px-3 text-xs text-muted-foreground">
                OR CONTINUE WITH
              </span>
            </div>

            <div className="flex space-x-4">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => {
                  toast({
                    description: "Google login is not implemented in this demo",
                  });
                }}
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png"
                  alt="Google"
                  className="w-5 h-5 mr-2"
                />
                Google
              </Button>
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => {
                  toast({
                    description: "Apple login is not implemented in this demo",
                  });
                }}
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/0/747.png"
                  alt="Apple"
                  className="w-5 h-5 mr-2"
                />
                Apple
              </Button>
            </div>

            {/* Sign up link */}
            <div className="text-center mt-8">
              <span className="text-muted-foreground">Don't have an account? </span>
              <Link to="/register" className="text-primary font-medium hover:underline">
                Sign Up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
