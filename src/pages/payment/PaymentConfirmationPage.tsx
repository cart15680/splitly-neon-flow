
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowLeft, CreditCard, AlertCircle } from "lucide-react";
import { products, paymentMethods } from "@/data/dummyData";
import { formatCurrency, formatDate } from "@/utils/format";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const PaymentConfirmationPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { productId, emiOption, totalAmount } = location.state || {};

  const product = products.find(p => p.id === productId);
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [pin, setPin] = useState("");
  const [showPinModal, setShowPinModal] = useState(false);

  if (!product || !totalAmount) {
    navigate("/shop");
    return null;
  }

  const currentDate = new Date();
  const firstEmiDate = new Date();
  firstEmiDate.setDate(currentDate.getDate() + 30);

  const handleConfirmPayment = () => {
    setShowPinModal(true);
  };

  const handleVerifyPin = () => {
    if (pin.length < 4) return;
    
    // For demo, allow any pin
    setShowPinModal(false);
    navigate("/payment/success", { 
      state: { 
        productId, 
        emiOption,
        totalAmount
      }
    });
  };

  return (
    <Layout title="Payment">
      <div className="p-4 pb-24 md:p-6 space-y-6">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => navigate(-1)}
          className="pl-0"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back
        </Button>

        <div>
          <h2 className="text-lg font-semibold mb-3">Payment Confirmation</h2>
          
          {/* Order Summary */}
          <Card className="mb-6">
            <CardContent className="p-4 space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Product</span>
                <span className="text-right font-medium">{product.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Amount</span>
                <span className="font-medium">{formatCurrency(totalAmount)}</span>
              </div>
              {emiOption && (
                <>
                  <div className="border-t border-border pt-3 font-medium">EMI Details:</div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Plan</span>
                    <span>{emiOption.months} months {emiOption.interest > 0 ? `@ ${emiOption.interest}%` : "(No interest)"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Monthly Installment</span>
                    <span className="font-medium">{formatCurrency(emiOption.monthlyAmount)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">First Due Date</span>
                    <span>{formatDate(firstEmiDate.toISOString())}</span>
                  </div>
                  <div className="bg-muted/20 p-3 rounded-md flex items-start space-x-3 mt-2">
                    <AlertCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <p className="text-sm">
                      By proceeding, you agree to pay the EMI amount on or before the due date every month.
                      Late payments may incur additional charges.
                    </p>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
          
          {/* Payment Methods */}
          <h3 className="font-medium mb-2">Select Payment Method</h3>
          <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-3">
            {paymentMethods.map((method) => (
              <Label
                key={method.id}
                htmlFor={method.id}
                className={`flex items-center p-3 border rounded-lg cursor-pointer ${
                  paymentMethod === method.id 
                    ? "border-primary bg-primary/5" 
                    : "border-border"
                }`}
              >
                <RadioGroupItem value={method.id} id={method.id} className="mr-3" />
                <div className="flex items-center">
                  <span className="text-lg mr-2">{method.icon}</span>
                  <span>{method.name}</span>
                </div>
              </Label>
            ))}
          </RadioGroup>
          
          {/* Selected Payment Details */}
          {paymentMethod === "upi" && (
            <Card className="mt-4">
              <CardContent className="p-4">
                <p className="font-medium mb-2">UPI Details</p>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">UPI ID</span>
                  <span>alex.johnson@okbank</span>
                </div>
              </CardContent>
            </Card>
          )}
          
          {paymentMethod === "card" && (
            <Card className="mt-4">
              <CardContent className="p-4">
                <p className="font-medium mb-2">Card Details</p>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Card Number</span>
                  <span>**** **** **** 4321</span>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Bottom Action */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t border-border">
        <Button 
          className="w-full neon-glow"
          onClick={handleConfirmPayment}
        >
          <CreditCard className="h-4 w-4 mr-2" />
          Confirm & Pay {formatCurrency(totalAmount)}
        </Button>
      </div>

      {/* PIN Verification Modal */}
      <Dialog open={showPinModal} onOpenChange={setShowPinModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Enter PIN to Confirm</DialogTitle>
            <DialogDescription>
              Please enter your 4-digit security PIN to authorize this payment.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <div className="flex justify-center my-4">
              <InputOTP maxLength={4} value={pin} onChange={setPin}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                </InputOTPGroup>
              </InputOTP>
            </div>
            
            <p className="text-xs text-center text-muted-foreground mb-4">
              For this demo, any 4-digit PIN will work
            </p>
            
            <Button 
              onClick={handleVerifyPin} 
              className="w-full neon-glow"
              disabled={pin.length < 4}
            >
              Verify & Pay
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default PaymentConfirmationPage;
