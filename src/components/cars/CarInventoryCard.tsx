import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Car, Calendar, DollarSign, Users, TrendingUp } from "lucide-react";
import { formatCurrency } from "@/utils/format";

interface CarInventoryCardProps {
  car: {
    id: string;
    name: string;
    price: number;
    stock: number;
    category: string;
    images: string[];
    emiInterest?: number;
  };
  onEmiSetup?: (carId: string) => void;
  onPriceUpdate?: (carId: string) => void;
}

const CarInventoryCard = ({ car, onEmiSetup, onPriceUpdate }: CarInventoryCardProps) => {
  const getStockStatus = (stock: number) => {
    if (stock > 3) return { label: "In Stock", color: "bg-green-500/10 text-green-500" };
    if (stock > 0) return { label: "Low Stock", color: "bg-yellow-500/10 text-yellow-500" };
    return { label: "Out of Stock", color: "bg-red-500/10 text-red-500" };
  };

  const stockStatus = getStockStatus(car.stock);

  // Calculate estimated monthly EMI for display
  const estimatedEmi = Math.round(car.price / 24); // 24 months default

  return (
    <Card className="neon-glow overflow-hidden">
      <div className="relative h-48">
        <img
          src={car.images[0]}
          alt={car.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 right-3">
          <Badge className={stockStatus.color}>
            {stockStatus.label}
          </Badge>
        </div>
      </div>
      
      <CardHeader className="pb-3">
        <CardTitle className="text-lg line-clamp-2">{car.name}</CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Price and Stock Info */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground mb-1">
              <DollarSign className="h-3 w-3" />
              Price
            </div>
            <p className="font-bold text-lg">{formatCurrency(car.price)}</p>
          </div>
          <div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground mb-1">
              <Car className="h-3 w-3" />
              Units
            </div>
            <p className="font-bold text-lg">{car.stock}</p>
          </div>
        </div>

        {/* EMI Information */}
        <div className="bg-muted/50 rounded-lg p-3 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Est. EMI (24mo)</span>
            <span className="font-medium">{formatCurrency(estimatedEmi)}/mo</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">EMI Interest</span>
            <span className="font-medium">{car.emiInterest || 10}% p.a.</span>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => onEmiSetup?.(car.id)}
            className="text-xs"
          >
            <TrendingUp className="h-3 w-3 mr-1" />
            EMI Setup
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => onPriceUpdate?.(car.id)}
            className="text-xs"
          >
            <DollarSign className="h-3 w-3 mr-1" />
            Update Price
          </Button>
        </div>

        {/* Sales Metrics */}
        <div className="pt-2 border-t border-border">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Users className="h-3 w-3" />
              <span>Inquiries: 12</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span>Test Drives: 3</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CarInventoryCard;