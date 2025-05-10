
import { useState } from "react";
import { QrCode, Copy, Send, Check } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
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
  CardContent 
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { formatCurrency } from "@/utils/format";

const paymentRequestSchema = z.object({
  amount: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Amount must be a valid number greater than zero",
  }),
  customerPhone: z.string().min(8, { message: "Please enter a valid Qatar phone number" }),
  description: z.string().optional(),
});

type PaymentRequestFormValues = z.infer<typeof paymentRequestSchema>;

interface PaymentRequestProps {
  open: boolean;
  onClose: () => void;
  productName?: string;
  productPrice?: number;
}

const PaymentRequest = ({ open, onClose, productName, productPrice }: PaymentRequestProps) => {
  const [qrGenerated, setQrGenerated] = useState(false);
  const [paymentLink, setPaymentLink] = useState("");
  
  const form = useForm<PaymentRequestFormValues>({
    resolver: zodResolver(paymentRequestSchema),
    defaultValues: {
      amount: productPrice ? productPrice.toString() : "",
      customerPhone: "",
      description: productName || "",
    },
  });

  const generatePaymentQR = (data: PaymentRequestFormValues) => {
    // In a real implementation, this would call an API to generate a payment link
    // For now we'll simulate it with a dummy link
    const requestId = Math.random().toString(36).substring(2, 10);
    const paymentData = {
      amount: data.amount,
      phone: data.customerPhone,
      description: data.description,
      merchant: "Your Store",
      requestId: requestId
    };
    
    // Generate a mock payment URL that would be displayed as QR
    const mockPaymentUrl = `https://splitly.com/pay/${requestId}`;
    
    setPaymentLink(mockPaymentUrl);
    setQrGenerated(true);
    
    return mockPaymentUrl;
  };

  const onSubmit = (data: PaymentRequestFormValues) => {
    generatePaymentQR(data);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(paymentLink);
    toast({
      title: "Payment link copied",
      description: "The payment link has been copied to your clipboard",
    });
  };

  const sendSMS = () => {
    // In a real implementation, this would send an SMS with the payment link
    toast({
      title: "Payment request sent",
      description: `Payment request sent to +974 ${form.getValues("customerPhone")}`,
    });
  };

  const resetForm = () => {
    setQrGenerated(false);
    form.reset();
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={resetForm}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Request Payment</DialogTitle>
          <DialogDescription>
            Create a payment request for your customer to scan or receive via SMS.
          </DialogDescription>
        </DialogHeader>
        
        {!qrGenerated ? (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount (QAR)</FormLabel>
                    <FormControl>
                      <Input placeholder="0.00" {...field} type="number" step="0.01" min="0" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="customerPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Customer's Phone (+974)</FormLabel>
                    <FormControl>
                      <Input placeholder="xxxx xxxx" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Payment Description</FormLabel>
                    <FormControl>
                      <Input placeholder="Product or service description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button type="submit" className="w-full neon-glow">Generate Payment Request</Button>
            </form>
          </Form>
        ) : (
          <div className="flex flex-col items-center space-y-4">
            <Card className="w-full">
              <CardContent className="flex flex-col items-center pt-6">
                <div className="w-48 h-48 bg-white p-2 rounded-md mb-4 flex items-center justify-center">
                  <QrCode className="w-full h-full" />
                </div>
                <p className="text-center mb-2">Amount: {formatCurrency(Number(form.getValues("amount")))}</p>
                <p className="text-center text-xs text-muted-foreground break-all">{paymentLink}</p>
              </CardContent>
            </Card>
            
            <div className="flex w-full gap-2">
              <Button onClick={copyToClipboard} variant="outline" className="flex-1">
                <Copy className="mr-2 h-4 w-4" />
                Copy Link
              </Button>
              <Button onClick={sendSMS} className="flex-1">
                <Send className="mr-2 h-4 w-4" />
                Send SMS
              </Button>
            </div>
          </div>
        )}
        
        <DialogFooter>
          {qrGenerated && (
            <Button onClick={resetForm} variant="outline" className="w-full">
              Create New Request
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentRequest;
