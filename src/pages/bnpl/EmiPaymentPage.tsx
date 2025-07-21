
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ChevronLeft, CreditCard, Smartphone, Check } from "lucide-react";
import { formatCurrency } from "@/utils/format";
import { toast } from "@/hooks/use-toast";

const EmiPaymentPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState<"upi" | "card" | "netbanking">("upi");
  const [upiId, setUpiId] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Dummy EMI data based on id
  const emiDetails = {
    id,
    productName: "iPhone 15 Pro",
    emiAmount: 367,
    dueDate: "2025-06-15",
    lateCharges: 0,
    totalDue: 367,
  };
  
  const handlePayment = () => {
    if (paymentMethod === "upi" && !upiId) {
      toast({
        title: "Please enter UPI ID",
        description: "A valid UPI ID is required to proceed",
        variant: "destructive"
      });
      return;
    }
    
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      toast({
        title: "Payment Successful",
        description: `Your EMI payment of ${formatCurrency(emiDetails.totalDue)} has been processed.`,
      });
      navigate("/bnpl");
    }, 2000);
  };
  
  return (
    <Layout title="EMI Payment">
      <div className="p-4 pb-20 md:p-6 space-y-6">
        {/* Back button */}
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-2">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        
        {/* EMI Payment Details */}
        <Card>
          <CardHeader>
            <CardTitle>Payment Details</CardTitle>
            <CardDescription>EMI payment for {emiDetails.productName}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-muted-foreground">EMI Amount</span>
              <span className="font-medium">{formatCurrency(emiDetails.emiAmount)}</span>
            </div>
            
            {emiDetails.lateCharges > 0 && (
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-muted-foreground">Late Charges</span>
                <span className="text-destructive font-medium">{formatCurrency(emiDetails.lateCharges)}</span>
              </div>
            )}
            
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-muted-foreground">Due Date</span>
              <span className="font-medium">{new Date(emiDetails.dueDate).toLocaleDateString("en-IN", {
                year: "numeric",
                month: "short",
                day: "numeric"
              })}</span>
            </div>
            
            <div className="flex justify-between py-2">
              <span className="font-semibold">Total Amount Due</span>
              <span className="font-bold text-xl">{formatCurrency(emiDetails.totalDue)}</span>
            </div>
          </CardContent>
        </Card>
        
        {/* Payment Method */}
        <Card>
          <CardHeader>
            <CardTitle>Select Payment Method</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup value={paymentMethod} onValueChange={(value) => setPaymentMethod(value as any)} className="space-y-4">
              <div className={`flex items-center space-x-2 rounded-lg border p-4 ${paymentMethod === "upi" ? "border-primary" : "border-border"}`}>
                <RadioGroupItem value="upi" id="upi" />
                <Label htmlFor="upi" className="flex flex-1 items-center">
                  <Smartphone className="mr-3 h-4 w-4" />
                  <span>UPI</span>
                </Label>
                {paymentMethod === "upi" && <Check className="h-4 w-4 text-primary" />}
              </div>
              
              <div className={`flex items-center space-x-2 rounded-lg border p-4 ${paymentMethod === "card" ? "border-primary" : "border-border"}`}>
                <RadioGroupItem value="card" id="card" />
                <Label htmlFor="card" className="flex flex-1 items-center">
                  <CreditCard className="mr-3 h-4 w-4" />
                  <span>Debit / Credit Card</span>
                </Label>
                {paymentMethod === "card" && <Check className="h-4 w-4 text-primary" />}
              </div>
              
              <div className={`flex items-center space-x-2 rounded-lg border p-4 ${paymentMethod === "netbanking" ? "border-primary" : "border-border"}`}>
                <RadioGroupItem value="netbanking" id="netbanking" />
                <Label htmlFor="netbanking" className="flex flex-1 items-center">
                  <svg className="mr-3 h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 7L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M5 12L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M5 17L19 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  <span>Net Banking</span>
                </Label>
                {paymentMethod === "netbanking" && <Check className="h-4 w-4 text-primary" />}
              </div>
            </RadioGroup>
            
            {/* UPI ID input */}
            {paymentMethod === "upi" && (
              <div className="mt-4">
                <Label htmlFor="upi-id">Enter UPI ID</Label>
                <Input 
                  id="upi-id" 
                  placeholder="example@upi" 
                  className="mt-1"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                />
                <p className="text-xs text-muted-foreground mt-1">e.g. mobilenumber@upi, username@bank</p>
              </div>
            )}
          </CardContent>
        </Card>
        
        {/* Payment Button */}
        <Button 
          onClick={handlePayment} 
          className="w-full neon-glow"
          disabled={isProcessing}
        >
          {isProcessing ? "Processing..." : `Pay ${formatCurrency(emiDetails.totalDue)}`}
        </Button>
      </div>
    </Layout>
  );
};

export default EmiPaymentPage;
