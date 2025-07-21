import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Calculator, Calendar, DollarSign } from "lucide-react";
import { formatCurrency } from "@/utils/format";

interface CarEmiCalculatorProps {
  carPrice: number;
  onSelectEmi: (option: EmiOption) => void;
}

export interface EmiOption {
  months: number;
  monthlyAmount: number;
  totalAmount: number;
  interestRate: number;
  downPayment: number;
}

const CarEmiCalculator = ({ carPrice, onSelectEmi }: CarEmiCalculatorProps) => {
  const [downPayment, setDownPayment] = useState([20000]); // Default 20k QAR down payment
  const tenure = 12; // Fixed 12 months for cars

  // Calculate EMI based on down payment and tenure
  const calculateEmi = (price: number, down: number, months: number): EmiOption => {
    const principal = price - down;
    const interestRate = months <= 12 ? 0.08 : months <= 24 ? 0.10 : 0.12; // Annual rates
    const monthlyRate = interestRate / 12;
    
    // EMI formula: P * r * (1+r)^n / ((1+r)^n - 1)
    const emi = principal * monthlyRate * Math.pow(1 + monthlyRate, months) / 
                (Math.pow(1 + monthlyRate, months) - 1);
    
    return {
      months,
      monthlyAmount: Math.round(emi),
      totalAmount: Math.round(emi * months + down),
      interestRate: interestRate * 100,
      downPayment: down
    };
  };

  const currentEmi = calculateEmi(carPrice, downPayment[0], tenure);
  
  // Remove quick options since tenure is fixed

  const maxDownPayment = Math.floor(carPrice * 0.5); // Max 50% down payment

  return (
    <Card className="neon-glow">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5" />
          EMI Calculator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Down Payment Slider */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium">Down Payment</label>
            <span className="text-sm font-medium">{formatCurrency(downPayment[0])}</span>
          </div>
          <Slider
            value={downPayment}
            onValueChange={setDownPayment}
            max={maxDownPayment}
            min={10000}
            step={5000}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{formatCurrency(10000)}</span>
            <span>{formatCurrency(maxDownPayment)}</span>
          </div>
        </div>

        {/* Fixed Tenure Display */}
        <div className="space-y-3">
          <label className="text-sm font-medium">Tenure (Fixed for Cars)</label>
          <div className="p-3 bg-muted rounded-lg text-center">
            <span className="font-medium">12 Months Only</span>
            <p className="text-xs text-muted-foreground mt-1">Standard car loan tenure</p>
          </div>
        </div>

        {/* EMI Details */}
        <div className="space-y-4 p-4 bg-muted/50 rounded-lg">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground mb-1">
                <DollarSign className="h-3 w-3" />
                Monthly EMI
              </div>
              <div className="text-lg font-bold text-primary">
                {formatCurrency(currentEmi.monthlyAmount)}
              </div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground mb-1">
                <Calendar className="h-3 w-3" />
                Total Amount
              </div>
              <div className="text-lg font-bold">
                {formatCurrency(currentEmi.totalAmount)}
              </div>
            </div>
          </div>
          
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Interest Rate</span>
            <Badge variant="secondary">{currentEmi.interestRate.toFixed(1)}% p.a.</Badge>
          </div>
          
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Total Interest</span>
            <span>{formatCurrency(currentEmi.totalAmount - carPrice)}</span>
          </div>
        </div>

        {/* Action Button */}
        <Button 
          className="w-full neon-glow"
          onClick={() => onSelectEmi(currentEmi)}
        >
          Select This EMI Plan
        </Button>
        
        <p className="text-xs text-muted-foreground text-center">
          *Interest rates are indicative and subject to approval
        </p>
      </CardContent>
    </Card>
  );
};

export default CarEmiCalculator;