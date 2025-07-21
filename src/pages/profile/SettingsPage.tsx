
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ChevronLeft, Save, Phone, Mail } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const SettingsPage = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  // User profile state
  const [profile, setProfile] = useState({
    name: "Rahul Sharma",
    email: "rahul.sharma@example.com",
    phone: "+91 9876543210",
  });
  
  // Notification settings
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    smsNotifications: true,
    paymentReminders: true,
    promotionalOffers: false,
    accountAlerts: true,
    appUpdates: true,
  });
  
  // App settings
  const [appSettings, setAppSettings] = useState({
    darkMode: true,
    biometricLogin: true,
    savePaymentMethods: true,
    showBalance: true,
  });
  
  const handleProfileUpdate = () => {
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      setIsEditing(false);
      
      toast({
        title: "Profile Updated",
        description: "Your profile information has been updated successfully",
      });
    }, 1500);
  };
  
  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
    
    toast({
      title: "Notification Setting Updated",
      description: `${key} has been ${notifications[key] ? 'disabled' : 'enabled'}`,
    });
  };
  
  const toggleAppSetting = (key: keyof typeof appSettings) => {
    setAppSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
    
    toast({
      title: "Setting Updated",
      description: `${key} has been ${appSettings[key] ? 'disabled' : 'enabled'}`,
    });
  };
  
  return (
    <Layout title="Settings">
      <div className="p-4 pb-20 md:p-6 space-y-6">
        <Button variant="ghost" onClick={() => navigate(-1)}>
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to Profile
        </Button>
        
        {/* Profile Settings */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Profile Details</CardTitle>
              {!isEditing && (
                <Button variant="outline" onClick={() => setIsEditing(true)}>
                  Edit
                </Button>
              )}
            </div>
            <CardDescription>Manage your personal information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input 
                id="name" 
                value={profile.name}
                onChange={e => setProfile({...profile, name: e.target.value})}
                disabled={!isEditing}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  id="email" 
                  value={profile.email}
                  onChange={e => setProfile({...profile, email: e.target.value})}
                  className="pl-10"
                  disabled={!isEditing}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  id="phone" 
                  value={profile.phone}
                  onChange={e => setProfile({...profile, phone: e.target.value})}
                  className="pl-10"
                  disabled={!isEditing}
                />
              </div>
            </div>
            
            {isEditing && (
              <div className="flex justify-end space-x-2 pt-2">
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
                <Button onClick={handleProfileUpdate} disabled={isSaving}>
                  {isSaving ? "Saving..." : "Save Changes"}
                  {!isSaving && <Save className="ml-2 h-4 w-4" />}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
        
        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Notification Settings</CardTitle>
            <CardDescription>Manage how you receive alerts and updates</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="email-notifications">Email Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Receive account updates via email
                </p>
              </div>
              <Switch
                id="email-notifications"
                checked={notifications.emailNotifications}
                onCheckedChange={() => toggleNotification('emailNotifications')}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="sms-notifications">SMS Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Receive account updates via SMS
                </p>
              </div>
              <Switch
                id="sms-notifications"
                checked={notifications.smsNotifications}
                onCheckedChange={() => toggleNotification('smsNotifications')}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="payment-reminders">Payment Reminders</Label>
                <p className="text-sm text-muted-foreground">
                  Get reminders before EMI due dates
                </p>
              </div>
              <Switch
                id="payment-reminders"
                checked={notifications.paymentReminders}
                onCheckedChange={() => toggleNotification('paymentReminders')}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="promotional-offers">Promotional Offers</Label>
                <p className="text-sm text-muted-foreground">
                  Receive offers, discounts and promotions
                </p>
              </div>
              <Switch
                id="promotional-offers"
                checked={notifications.promotionalOffers}
                onCheckedChange={() => toggleNotification('promotionalOffers')}
              />
            </div>
          </CardContent>
        </Card>
        
        {/* App Settings */}
        <Card>
          <CardHeader>
            <CardTitle>App Settings</CardTitle>
            <CardDescription>Configure your app preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="dark-mode">Dark Mode</Label>
                <p className="text-sm text-muted-foreground">
                  Use dark theme throughout the app
                </p>
              </div>
              <Switch
                id="dark-mode"
                checked={appSettings.darkMode}
                onCheckedChange={() => toggleAppSetting('darkMode')}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="biometric-login">Biometric Login</Label>
                <p className="text-sm text-muted-foreground">
                  Sign in using fingerprint or face ID
                </p>
              </div>
              <Switch
                id="biometric-login"
                checked={appSettings.biometricLogin}
                onCheckedChange={() => toggleAppSetting('biometricLogin')}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="save-payment-methods">Save Payment Methods</Label>
                <p className="text-sm text-muted-foreground">
                  Securely store payment information for faster checkout
                </p>
              </div>
              <Switch
                id="save-payment-methods"
                checked={appSettings.savePaymentMethods}
                onCheckedChange={() => toggleAppSetting('savePaymentMethods')}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="show-balance">Show Balance</Label>
                <p className="text-sm text-muted-foreground">
                  Display your credit balance on dashboard
                </p>
              </div>
              <Switch
                id="show-balance"
                checked={appSettings.showBalance}
                onCheckedChange={() => toggleAppSetting('showBalance')}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default SettingsPage;
