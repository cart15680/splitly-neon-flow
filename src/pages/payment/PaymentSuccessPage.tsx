
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, ArrowRight, Home } from "lucide-react";
import { products } from "@/data/dummyData";
import { formatCurrency } from "@/utils/format";

const PaymentSuccessPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { productId, emiOption, totalAmount } = location.state || {};

  const product = products.find(p => p.id === productId);
  
  useEffect(() => {
    // If no product data, redirect to dashboard
    if (!product) {
      navigate('/dashboard');
    }
  }, [product, navigate]);

  if (!product) {
    return null;
  }

  const orderId = `ORD${Math.floor(1000000000 + Math.random() * 9000000000)}`;
  const currentDate = new Date();
  
  return (
    <Layout showNav={false}>
      <div className="min-h-screen flex flex-col bg-background p-6">
        <div className="flex-1 flex flex-col items-center justify-center max-w-md mx-auto">
          {/* Success Animation */}
          <div className="mb-6">
            <div className="relative flex items-center justify-center">
              <div className="absolute w-24 h-24 rounded-full bg-primary/20 animate-pulse"></div>
              <CheckCircle2 className="h-16 w-16 text-primary z-10" />
            </div>
          </div>
          
          <h1 className="text-3xl font-bold text-center mb-2">Payment Successful!</h1>
          <p className="text-muted-foreground text-center mb-8">
            Your order has been placed successfully
          </p>
          
          {/* Order Details Card */}
          <Card className="w-full">
            <CardContent className="p-5 space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Order ID</span>
                <span className="font-medium">{orderId}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Date</span>
                <span>{currentDate.toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'short', 
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Payment Method</span>
                <span>UPI</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Total Amount</span>
                <span className="font-semibold">{formatCurrency(totalAmount)}</span>
              </div>
              
              {emiOption && (
                <div className="pt-2 border-t border-border space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-primary">EMI Plan</span>
                    <span className="text-primary font-medium">
                      {formatCurrency(emiOption.monthlyAmount)} × {emiOption.months} months
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">First EMI Date</span>
                    <span>{new Date(currentDate.setDate(currentDate.getDate() + 30)).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'short', 
                      day: 'numeric'
                    })}</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Product info */}
          <Card className="w-full mt-5">
            <CardContent className="p-4">
              <div className="flex gap-3">
                <div className="w-16 h-16 overflow-hidden rounded-md">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium line-clamp-2">{product.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Delivery expected by {new Date(currentDate.setDate(currentDate.getDate() + 7)).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex flex-col w-full gap-3 mt-8">
            <Button 
              onClick={() => navigate('/bnpl')}
              className="neon-glow"
            >
              View EMI Plan
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            
            <Button 
              variant="outline" 
              onClick={() => navigate('/dashboard')}
            >
              <Home className="mr-2 h-4 w-4" />
              Go to Dashboard
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PaymentSuccessPage;
