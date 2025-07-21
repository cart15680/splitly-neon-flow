
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowLeft, CreditCard, AlertCircle, Wallet, QrCode } from "lucide-react";
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
import QatarPaymentMethods from "@/components/payment/QatarPaymentMethods";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const PaymentConfirmationPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { productId, emiOption, totalAmount } = location.state || {};

  const product = products.find(p => p.id === productId);
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [qatarPaymentMethod, setQatarPaymentMethod] = useState("qpay");
  const [paymentRegion, setPaymentRegion] = useState("qatar");
  const [pin, setPin] = useState("");
  const [showPinModal, setShowPinModal] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cvv, setCvv] = useState("");

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

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Format card number with spaces
    const value = e.target.value.replace(/\s/g, "");
    let formatted = "";
    
    for (let i = 0; i < value.length && i < 16; i++) {
      if (i > 0 && i % 4 === 0) {
        formatted += " ";
      }
      formatted += value[i];
    }
    
    setCardNumber(formatted);
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 2) {
      setCardExpiry(value);
    } else if (value.length <= 4) {
      setCardExpiry(`${value.slice(0, 2)}/${value.slice(2)}`);
    }
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
          
          {/* Payment Regions */}
          <Tabs defaultValue="qatar" value={paymentRegion} onValueChange={setPaymentRegion} className="mb-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="qatar">Qatar Payments</TabsTrigger>
              <TabsTrigger value="international">International</TabsTrigger>
            </TabsList>
            <TabsContent value="qatar" className="mt-4">
              <QatarPaymentMethods 
                selectedMethod={qatarPaymentMethod}
                onSelectMethod={setQatarPaymentMethod}
              />
              
              {/* Qatar Payment Details */}
              {qatarPaymentMethod === "qpay" && (
                <Card className="mt-4">
                  <CardContent className="p-4">
                    <div className="space-y-4">
                      <h3 className="font-medium">QPay Card Details</h3>
                      <div className="space-y-2">
                        <Label htmlFor="card-number">Card Number</Label>
                        <Input
                          id="card-number"
                          placeholder="0000 0000 0000 0000"
                          value={cardNumber}
                          onChange={handleCardNumberChange}
                          maxLength={19}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="expiry">Expiry Date</Label>
                          <Input
                            id="expiry"
                            placeholder="MM/YY"
                            value={cardExpiry}
                            onChange={handleExpiryChange}
                            maxLength={5}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cvv">CVV</Label>
                          <Input
                            id="cvv"
                            type="password"
                            placeholder="***"
                            maxLength={3}
                            value={cvv}
                            onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 3))}
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {qatarPaymentMethod === "sadad" && (
                <Card className="mt-4">
                  <CardContent className="p-4 text-center">
                    <div className="flex flex-col items-center py-4">
                      <Wallet className="h-12 w-12 text-primary mb-4" />
                      <h3 className="font-medium mb-1">Pay with SADAD Qatar</h3>
                      <p className="text-sm text-muted-foreground mb-4">You'll be redirected to SADAD payment page to complete your transaction.</p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {qatarPaymentMethod === "fatora" && (
                <Card className="mt-4">
                  <CardContent className="p-4 text-center">
                    <div className="flex flex-col items-center py-4">
                      <QrCode className="h-12 w-12 text-primary mb-4" />
                      <h3 className="font-medium mb-1">Fatora QR Code Payment</h3>
                      <p className="text-sm text-muted-foreground mb-2">Scan the QR code using your Fatora app</p>
                      <div className="border-2 border-dashed p-8 rounded-md mb-4 mt-2">
                        <div className="h-40 w-40 bg-muted flex items-center justify-center">
                          <p className="text-xs text-muted-foreground">QR Code will appear here</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {qatarPaymentMethod === "meeza" && (
                <Card className="mt-4">
                  <CardContent className="p-4">
                    <div className="space-y-4">
                      <h3 className="font-medium">Meeza Card Details</h3>
                      <div className="space-y-2">
                        <Label htmlFor="meeza-number">Meeza Card Number</Label>
                        <Input
                          id="meeza-number"
                          placeholder="0000 0000 0000 0000"
                          value={cardNumber}
                          onChange={handleCardNumberChange}
                          maxLength={19}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="meeza-expiry">Expiry Date</Label>
                          <Input
                            id="meeza-expiry"
                            placeholder="MM/YY"
                            value={cardExpiry}
                            onChange={handleExpiryChange}
                            maxLength={5}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="meeza-cvv">CVV</Label>
                          <Input
                            id="meeza-cvv"
                            type="password"
                            placeholder="***"
                            maxLength={3}
                            value={cvv}
                            onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 3))}
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
            
            <TabsContent value="international" className="mt-4">
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
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Bottom Action */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t border-border">
        <Button 
          className="w-full neon-glow"
          onClick={handleConfirmPayment}
          disabled={paymentRegion === "qatar" ? 
            ((qatarPaymentMethod === "qpay" || qatarPaymentMethod === "meeza") && 
              (!cardNumber || !cardExpiry || !cvv)) : 
            false
          }
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
