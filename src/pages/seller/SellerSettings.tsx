
import SellerLayout from "@/components/seller/SellerLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const SellerSettings = () => {
  return (
    <SellerLayout title="Account Settings">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <h2 className="text-2xl font-bold">Settings</h2>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* Password Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Password & Security</CardTitle>
            <CardDescription>Update your password and security settings</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input id="current-password" type="password" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input id="new-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input id="confirm-password" type="password" />
                </div>
              </div>
              <Button>Update Password</Button>
            </form>

            <div className="mt-6 pt-6 border-t border-border">
              <h3 className="text-lg font-medium mb-4">Two-Factor Authentication</h3>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Enable Two-Factor Authentication</p>
                  <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                </div>
                <Switch />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Notification Preferences</CardTitle>
            <CardDescription>Manage how you receive notifications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Email Notifications</p>
                  <p className="text-sm text-muted-foreground">Receive order and account updates via email</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">SMS Notifications</p>
                  <p className="text-sm text-muted-foreground">Get critical updates via SMS</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Order Confirmations</p>
                  <p className="text-sm text-muted-foreground">Receive notifications for new orders</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Payment Confirmations</p>
                  <p className="text-sm text-muted-foreground">Receive notifications for payment confirmations</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Marketing Updates</p>
                  <p className="text-sm text-muted-foreground">Receive promotional emails and updates</p>
                </div>
                <Switch />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Account Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Account Preferences</CardTitle>
            <CardDescription>Manage your account settings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Dark Mode</p>
                  <p className="text-sm text-muted-foreground">Use dark mode for the seller dashboard</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Show Earnings on Dashboard</p>
                  <p className="text-sm text-muted-foreground">Display your earnings on the dashboard</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Auto-approve customer reviews</p>
                  <p className="text-sm text-muted-foreground">Automatically approve customer reviews</p>
                </div>
                <Switch />
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-border">
              <h3 className="text-lg font-medium mb-4">Account Actions</h3>
              <div className="flex flex-col space-y-2">
                <Button variant="outline">Export Account Data</Button>
                <Button variant="destructive">Deactivate Account</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </SellerLayout>
  );
};

export default SellerSettings;
