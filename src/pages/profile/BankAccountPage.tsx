
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronLeft, Check } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const BankAccountPage = () => {
  const navigate = useNavigate();
  const [isAdding, setIsAdding] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form state
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [confirmAccountNumber, setConfirmAccountNumber] = useState("");
  const [ifscCode, setIfscCode] = useState("");
  const [accountType, setAccountType] = useState("");
  const [consent, setConsent] = useState(false);
  
  // Linked bank accounts
  const [linkedAccounts, setLinkedAccounts] = useState([
    {
      id: "acc1",
      bankName: "HDFC Bank",
      accountNumber: "XXXX XXXX 2345",
      ifscCode: "HDFC0001234",
      isDefault: true
    }
  ]);

  const handleAddAccount = () => {
    if (accountNumber !== confirmAccountNumber) {
      toast({
        title: "Account numbers don't match",
        description: "Please ensure both account numbers are the same",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      
      // Add new account
      const newAccount = {
        id: `acc${linkedAccounts.length + 1}`,
        bankName,
        accountNumber: `XXXX XXXX ${accountNumber.slice(-4)}`,
        ifscCode,
        isDefault: linkedAccounts.length === 0
      };
      
      setLinkedAccounts([...linkedAccounts, newAccount]);
      setIsAdding(false);
      
      // Reset form
      setBankName("");
      setAccountNumber("");
      setConfirmAccountNumber("");
      setIfscCode("");
      setAccountType("");
      setConsent(false);
      
      toast({
        title: "Bank Account Added",
        description: "Your bank account has been successfully linked",
      });
    }, 2000);
  };

  const makeAccountDefault = (id: string) => {
    setLinkedAccounts(linkedAccounts.map(acc => ({
      ...acc,
      isDefault: acc.id === id
    })));
    
    toast({
      title: "Default Account Updated",
      description: "Your default account has been updated successfully",
    });
  };
  
  const removeAccount = (id: string) => {
    setLinkedAccounts(linkedAccounts.filter(acc => acc.id !== id));
    
    toast({
      title: "Account Removed",
      description: "Bank account has been unlinked successfully",
    });
  };
  
  return (
    <Layout title="Bank Account">
      <div className="p-4 pb-20 md:p-6 space-y-6">
        <Button variant="ghost" onClick={() => navigate(-1)}>
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to Profile
        </Button>
        
        {/* Linked Accounts */}
        {!isAdding && (
          <>
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Your Bank Accounts</h2>
              <Button onClick={() => setIsAdding(true)}>Add New</Button>
            </div>
            
            {linkedAccounts.length > 0 ? (
              <div className="space-y-4">
                {linkedAccounts.map(account => (
                  <Card key={account.id}>
                    <CardContent className="p-4">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="font-medium">{account.bankName}</h3>
                          <p className="text-sm text-muted-foreground">Account: {account.accountNumber}</p>
                          <p className="text-sm text-muted-foreground">IFSC: {account.ifscCode}</p>
                        </div>
                        
                        <div className="flex flex-col justify-between items-end">
                          {account.isDefault && (
                            <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full">
                              Default
                            </span>
                          )}
                          
                          <div className="mt-2 space-x-2">
                            {!account.isDefault && (
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => makeAccountDefault(account.id)}
                              >
                                Set Default
                              </Button>
                            )}
                            <Button 
                              variant="destructive" 
                              size="sm"
                              onClick={() => removeAccount(account.id)}
                              disabled={account.isDefault}
                            >
                              Remove
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-6 text-center">
                  <p className="text-muted-foreground mb-4">No bank accounts linked yet</p>
                  <Button onClick={() => setIsAdding(true)} className="neon-glow">
                    Add Your First Bank Account
                  </Button>
                </CardContent>
              </Card>
            )}
          </>
        )}
        
        {/* Add New Account Form */}
        {isAdding && (
          <Card>
            <CardHeader>
              <CardTitle>Add Bank Account</CardTitle>
              <CardDescription>
                Link your bank account to receive refunds and withdrawals
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="bank-name">Bank Name</Label>
                <Select value={bankName} onValueChange={setBankName}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your bank" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="HDFC Bank">HDFC Bank</SelectItem>
                    <SelectItem value="ICICI Bank">ICICI Bank</SelectItem>
                    <SelectItem value="State Bank of India">State Bank of India</SelectItem>
                    <SelectItem value="Axis Bank">Axis Bank</SelectItem>
                    <SelectItem value="Kotak Mahindra Bank">Kotak Mahindra Bank</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="account-number">Account Number</Label>
                <Input 
                  id="account-number" 
                  placeholder="Enter account number"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirm-account-number">Confirm Account Number</Label>
                <Input 
                  id="confirm-account-number" 
                  placeholder="Re-enter account number"
                  value={confirmAccountNumber}
                  onChange={(e) => setConfirmAccountNumber(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="ifsc-code">IFSC Code</Label>
                <Input 
                  id="ifsc-code" 
                  placeholder="Enter IFSC code"
                  value={ifscCode}
                  onChange={(e) => setIfscCode(e.target.value.toUpperCase())}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="account-type">Account Type</Label>
                <Select value={accountType} onValueChange={setAccountType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select account type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="savings">Savings</SelectItem>
                    <SelectItem value="current">Current</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center space-x-2 pt-2">
                <Checkbox id="consent" checked={consent} onCheckedChange={(checked) => setConsent(!!checked)} />
                <Label htmlFor="consent" className="text-sm">
                  I authorize Splitly to verify my account details and debit/credit my account as per the terms and conditions
                </Label>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-2">
              <Button 
                className="w-full neon-glow" 
                onClick={handleAddAccount}
                disabled={
                  !bankName || 
                  !accountNumber || 
                  !confirmAccountNumber || 
                  accountNumber !== confirmAccountNumber || 
                  !ifscCode || 
                  !accountType || 
                  !consent ||
                  isSubmitting
                }
              >
                {isSubmitting ? "Adding Account..." : "Add Bank Account"}
              </Button>
              <Button 
                variant="ghost" 
                onClick={() => setIsAdding(false)}
              >
                Cancel
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default BankAccountPage;
