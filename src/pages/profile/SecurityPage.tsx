
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog";
import { ChevronLeft, Smartphone, Shield, LockKeyhole, AlertTriangle, LogOut } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const SecurityPage = () => {
  const navigate = useNavigate();
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  
  // Password change state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  
  // Security settings
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: true,
    biometricAuth: true,
    pinAccess: false,
    deviceTracking: true,
  });
  
  // Recent logins
  const recentLogins = [
    { 
      device: "iPhone 13", 
      location: "Mumbai, India", 
      ip: "103.156.XX.XX",
      time: "Today, 2:30 PM",
      current: true
    },
    { 
      device: "Windows PC", 
      location: "Mumbai, India", 
      ip: "103.156.XX.XX",
      time: "Yesterday, 10:15 AM",
      current: false
    },
    { 
      device: "MacBook Pro", 
      location: "Delhi, India", 
      ip: "182.64.XX.XX",
      time: "May 15, 2025, 8:45 PM",
      current: false
    }
  ];
  
  const handlePasswordChange = () => {
    if (newPassword !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "New password and confirm password must be the same",
        variant: "destructive"
      });
      return;
    }
    
    setIsChangingPassword(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsChangingPassword(false);
      setShowChangePassword(false);
      
      // Reset form
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      
      toast({
        title: "Password Changed",
        description: "Your password has been updated successfully",
      });
    }, 1500);
  };
  
  const toggleSecurity = (key: keyof typeof securitySettings) => {
    setSecuritySettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
    
    toast({
      title: "Security Setting Updated",
      description: `${key} has been ${securitySettings[key] ? 'disabled' : 'enabled'}`,
    });
  };
  
  const handleLogout = () => {
    // Simulate logout
    setTimeout(() => {
      navigate("/login");
      toast({
        title: "Logged Out",
        description: "You have been logged out successfully",
      });
    }, 1000);
  };
  
  const logoutAllDevices = () => {
    // Simulate logout from all devices
    setTimeout(() => {
      setShowLogoutConfirm(false);
      toast({
        title: "Logged Out from All Devices",
        description: "You have been logged out from all devices",
      });
      
      // Navigate to login after a brief delay
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }, 1500);
  };
  
  return (
    <Layout title="Security">
      <div className="p-4 pb-20 md:p-6 space-y-6">
        <Button variant="ghost" onClick={() => navigate(-1)}>
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to Profile
        </Button>
        
        {/* Password Management */}
        <Card>
          <CardHeader>
            <CardTitle>Password Management</CardTitle>
            <CardDescription>Update your password regularly for enhanced security</CardDescription>
          </CardHeader>
          <CardContent>
            {!showChangePassword ? (
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => setShowChangePassword(true)}
              >
                <LockKeyhole className="mr-2 h-4 w-4" />
                Change Password
              </Button>
            ) : (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input 
                    id="current-password" 
                    type="password"
                    value={currentPassword}
                    onChange={e => setCurrentPassword(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input 
                    id="new-password" 
                    type="password"
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input 
                    id="confirm-password" 
                    type="password"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                  />
                </div>
                
                <div className="pt-2 flex justify-end space-x-2">
                  <Button 
                    variant="ghost" 
                    onClick={() => setShowChangePassword(false)}
                  >
                    Cancel
                  </Button>
                  <Button 
                    onClick={handlePasswordChange}
                    disabled={!currentPassword || !newPassword || !confirmPassword || isChangingPassword}
                  >
                    {isChangingPassword ? "Updating..." : "Update Password"}
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
        
        {/* Security Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Security Settings</CardTitle>
            <CardDescription>Manage your account security preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                <p className="text-sm text-muted-foreground">
                  Receive a verification code when logging in from a new device
                </p>
              </div>
              <Switch
                id="two-factor"
                checked={securitySettings.twoFactorAuth}
                onCheckedChange={() => toggleSecurity('twoFactorAuth')}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="biometric">Biometric Authentication</Label>
                <p className="text-sm text-muted-foreground">
                  Use fingerprint or face recognition to secure your account
                </p>
              </div>
              <Switch
                id="biometric"
                checked={securitySettings.biometricAuth}
                onCheckedChange={() => toggleSecurity('biometricAuth')}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="pin-access">Enable PIN Access</Label>
                <p className="text-sm text-muted-foreground">
                  Use a 4-digit PIN for quick access to the app
                </p>
              </div>
              <Switch
                id="pin-access"
                checked={securitySettings.pinAccess}
                onCheckedChange={() => toggleSecurity('pinAccess')}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="device-tracking">Device Tracking</Label>
                <p className="text-sm text-muted-foreground">
                  Track login activity across your devices
                </p>
              </div>
              <Switch
                id="device-tracking"
                checked={securitySettings.deviceTracking}
                onCheckedChange={() => toggleSecurity('deviceTracking')}
              />
            </div>
          </CardContent>
        </Card>
        
        {/* Recent Login Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Login Activity</CardTitle>
            <CardDescription>Recent devices that have accessed your account</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentLogins.map((login, index) => (
              <div key={index} className="flex justify-between items-start border-b border-border pb-4 last:pb-0 last:border-0">
                <div>
                  <div className="flex items-center space-x-2">
                    <Smartphone className="h-4 w-4 text-primary" />
                    <h3 className="font-medium">{login.device}</h3>
                    {login.current && (
                      <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full">
                        Current
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{login.location} • {login.ip}</p>
                  <p className="text-xs text-muted-foreground mt-1">Last active: {login.time}</p>
                </div>
                
                {!login.current && (
                  <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                    Log Out
                  </Button>
                )}
              </div>
            ))}
          </CardContent>
          <CardFooter>
            <Button 
              variant="destructive" 
              className="w-full"
              onClick={() => setShowLogoutConfirm(true)}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Log Out From All Devices
            </Button>
          </CardFooter>
        </Card>
        
        {/* Logout Button */}
        <Button 
          variant="destructive" 
          className="w-full"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Log Out
        </Button>
      </div>
      
      {/* Logout from all devices confirmation */}
      <AlertDialog open={showLogoutConfirm} onOpenChange={setShowLogoutConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Logout from all devices?</AlertDialogTitle>
            <AlertDialogDescription>
              This will end all active sessions on all devices. You'll need to log in again on each device.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              className="bg-destructive text-destructive-foreground"
              onClick={logoutAllDevices}
            >
              Yes, Log Out Everywhere
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Layout>
  );
};

export default SecurityPage;
