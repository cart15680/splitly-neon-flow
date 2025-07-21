
import React, { useState } from "react";
import QrScanner from "@/components/shared/QrScanner";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { formatCurrency } from "@/utils/format";
import { Check, X, User, CreditCard } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface PaymentScannerProps {
  open: boolean;
  onClose: () => void;
}

interface PaymentDetails {
  id: string;
  customerName: string;
  amount: number;
  paymentMethod: string;
  timestamp: string;
}

const PaymentScanner = ({ open, onClose }: PaymentScannerProps) => {
  const [scanning, setScanning] = useState(true);
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<"pending" | "approved" | "rejected" | null>(null);

  const handleScanSuccess = (result: string) => {
    try {
      // In a real app, the QR code would contain a payment token or ID
      // For demo purposes, we'll parse a simulated payment JSON or use the string as an ID
      let paymentData: PaymentDetails;
      
      try {
        // Try to parse as JSON
        paymentData = JSON.parse(result);
      } catch (e) {
        // If not JSON, create a mock payment based on the scan result
        const paymentId = result.includes("pay") ? result.split("pay/")[1] : result;
        
        paymentData = {
          id: paymentId,
          customerName: "Customer",
          amount: Math.floor(Math.random() * 500) + 50,
          paymentMethod: "QPay",
          timestamp: new Date().toISOString(),
        };
      }
      
      setPaymentDetails(paymentData);
      setScanning(false);
      setPaymentStatus("pending");
      
      toast({
        title: "Payment QR Scanned",
        description: `Payment of ${formatCurrency(paymentData.amount)} detected`,
      });
      
    } catch (error) {
      toast({
        title: "Invalid QR Code",
        description: "This QR code doesn't contain valid payment information",
        variant: "destructive"
      });
    }
  };
  
  const handlePaymentAction = (action: "approved" | "rejected") => {
    setPaymentStatus(action);
    
    if (action === "approved") {
      toast({
        title: "Payment Approved",
        description: `Payment of ${paymentDetails ? formatCurrency(paymentDetails.amount) : ""} has been approved`,
      });
    } else {
      toast({
        title: "Payment Rejected",
        description: `Payment has been rejected`,
        variant: "destructive"
      });
    }
    
    // In a real app, you'd call your payment API here
    
    // Reset the scanner after 2 seconds
    setTimeout(() => {
      setScanning(true);
      setPaymentDetails(null);
      setPaymentStatus(null);
    }, 2000);
  };
  
  const resetScanner = () => {
    setScanning(true);
    setPaymentDetails(null);
    setPaymentStatus(null);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Scan Payment QR</DialogTitle>
          <DialogDescription>
            Scan your customer's payment QR code to accept payment
          </DialogDescription>
        </DialogHeader>
        
        {scanning ? (
          <QrScanner
            onScanSuccess={handleScanSuccess}
            onClose={() => onClose()}
          />
        ) : (
          <Card>
            <CardHeader className={`${
              paymentStatus === "approved" ? "bg-green-500/10" :
              paymentStatus === "rejected" ? "bg-red-500/10" :
              "bg-yellow-500/10"
            }`}>
              <CardTitle className="flex justify-between">
                <span>Payment Details</span>
                <Badge className={`${
                  paymentStatus === "approved" ? "bg-green-500" :
                  paymentStatus === "rejected" ? "bg-red-500" :
                  "bg-yellow-500"
                } text-white`}>
                  {paymentStatus === "approved" ? "Approved" :
                   paymentStatus === "rejected" ? "Rejected" : "Pending"}
                </Badge>
              </CardTitle>
              <CardDescription>
                Reference ID: {paymentDetails?.id}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <User className="mr-2 h-5 w-5 text-muted-foreground" />
                  <span className="text-muted-foreground">Customer:</span>
                </div>
                <span className="font-medium">{paymentDetails?.customerName}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <CreditCard className="mr-2 h-5 w-5 text-muted-foreground" />
                  <span className="text-muted-foreground">Payment Method:</span>
                </div>
                <span className="font-medium">{paymentDetails?.paymentMethod}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Amount:</span>
                <span className="font-bold text-xl">{paymentDetails ? formatCurrency(paymentDetails.amount) : ""}</span>
              </div>
            </CardContent>
            <CardFooter className="flex gap-2 pt-2">
              {paymentStatus === "pending" ? (
                <>
                  <Button 
                    onClick={() => handlePaymentAction("rejected")} 
                    variant="outline"
                    className="flex-1"
                  >
                    <X className="mr-2 h-4 w-4" />
                    Reject
                  </Button>
                  <Button 
                    onClick={() => handlePaymentAction("approved")} 
                    className="flex-1 neon-glow"
                  >
                    <Check className="mr-2 h-4 w-4" />
                    Approve
                  </Button>
                </>
              ) : (
                <Button onClick={resetScanner} className="w-full">
                  Scan Another
                </Button>
              )}
            </CardFooter>
          </Card>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PaymentScanner;
