
import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Check, CreditCard, Wallet, QrCode } from "lucide-react";

interface PaymentMethod {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
}

interface QatarPaymentMethodsProps {
  selectedMethod: string;
  onSelectMethod: (method: string) => void;
}

const QatarPaymentMethods = ({ selectedMethod, onSelectMethod }: QatarPaymentMethodsProps) => {
  const paymentMethods: PaymentMethod[] = [
    {
      id: "qpay",
      name: "QPay",
      icon: <CreditCard className="h-5 w-5" />,
      description: "Qatar's leading payment gateway supporting local and international cards"
    },
    {
      id: "sadad",
      name: "Sadad",
      icon: <Wallet className="h-5 w-5" />,
      description: "Qatar's popular bill payment and eCommerce payment solution"
    },
    {
      id: "fatora",
      name: "Fatora",
      icon: <QrCode className="h-5 w-5" />,
      description: "Easy QR-based payments with fast processing"
    },
    {
      id: "meeza",
      name: "Meeza Card",
      icon: <CreditCard className="h-5 w-5" />,
      description: "Qatar's national debit card payment system"
    }
  ];

  return (
    <Card>
      <CardContent className="p-4">
        <h3 className="font-medium mb-3">Qatar Payment Methods</h3>
        <RadioGroup value={selectedMethod} onValueChange={onSelectMethod} className="space-y-3">
          {paymentMethods.map((method) => (
            <Label
              key={method.id}
              htmlFor={method.id}
              className={`flex items-center p-3 border rounded-lg cursor-pointer ${
                selectedMethod === method.id 
                  ? "border-primary bg-primary/5" 
                  : "border-border"
              }`}
            >
              <RadioGroupItem value={method.id} id={method.id} className="mr-3" />
              <div className="flex flex-1 items-center justify-between">
                <div className="flex items-center">
                  <span className="flex items-center justify-center h-8 w-8 bg-muted rounded-full mr-3">
                    {method.icon}
                  </span>
                  <div>
                    <p className="font-medium">{method.name}</p>
                    <p className="text-xs text-muted-foreground">{method.description}</p>
                  </div>
                </div>
                {selectedMethod === method.id && (
                  <Check className="h-4 w-4 text-primary ml-2" />
                )}
              </div>
            </Label>
          ))}
        </RadioGroup>
      </CardContent>
    </Card>
  );
};

export default QatarPaymentMethods;
