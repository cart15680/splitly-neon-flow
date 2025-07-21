
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { ShoppingCart, CreditCard, Star, Heart, ArrowLeft } from "lucide-react";
import { products, merchants } from "@/data/dummyData";
import { formatCurrency } from "@/utils/format";
import { toast } from "@/hooks/use-toast";
import CarEmiCalculator, { type EmiOption } from "@/components/cars/CarEmiCalculator";

const ProductDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const product = products.find((p) => p.id === id);
  const [selectedEmiOption, setSelectedEmiOption] = useState<EmiOption | null>(null);

  if (!product) {
    return (
      <Layout>
        <div className="p-6 text-center">
          <h2 className="text-xl">Product not found</h2>
          <Button onClick={() => navigate(-1)} className="mt-4">
            Go Back
          </Button>
        </div>
      </Layout>
    );
  }

  const merchant = merchants.find((m) => m.id === product.merchantId);
  const effectivePrice = product.price * (1 - (product.discount || 0) / 100);
  
  // EMI options - 3 months only for non-car products
  const emiOptions = [
    { months: 3, interest: 0, monthlyAmount: Math.round(effectivePrice / 3) }
  ];

  const addToCart = () => {
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart`,
    });
  };

  const buyNow = () => {
    // If EMI option is selected, go to checkout with EMI option
    navigate("/checkout", { 
      state: { 
        productId: product.id, 
        emiOption: selectedEmiOption 
      }
    });
  };

  return (
    <Layout>
      <div className="pb-20">
        {/* Back Button */}
        <div className="p-4">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate(-1)}
            className="pl-0"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back
          </Button>
        </div>

        {/* Product Images Carousel */}
        <Carousel className="w-full">
          <CarouselContent>
            {product.images.map((image, index) => (
              <CarouselItem key={index}>
                <div className="w-full h-64 md:h-80 overflow-hidden">
                  <img
                    src={image}
                    alt={`${product.name} - Image ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* Product Info */}
        <div className="p-4 space-y-4">
          <div>
            <div className="flex justify-between">
              <h1 className="text-xl font-bold">{product.name}</h1>
              <Button variant="ghost" size="icon" className="text-muted-foreground">
                <Heart className="h-5 w-5" />
              </Button>
            </div>
            <p className="text-muted-foreground text-sm">{merchant?.name}</p>
            
            <div className="flex items-center mt-1">
              <div className="flex items-center bg-primary/10 px-2 py-0.5 rounded-full">
                <Star className="h-3 w-3 text-primary fill-primary" />
                <span className="text-xs ml-1 font-medium">{product.rating}</span>
              </div>
              <span className="text-xs text-muted-foreground ml-2">
                {product.reviews} reviews
              </span>
            </div>
          </div>

          <div className="flex items-baseline">
            <span className="text-2xl font-bold">
              {formatCurrency(effectivePrice)}
            </span>
            {product.discount && (
              <div className="ml-2">
                <span className="text-sm text-muted-foreground line-through">
                  {formatCurrency(product.price)}
                </span>
                <span className="ml-2 text-sm text-primary">
                  {product.discount}% off
                </span>
              </div>
            )}
          </div>

          <div>
            <p className="text-sm">{product.description}</p>
          </div>

          {/* EMI Options */}
          {product.bnplEligible && (
            <>
              {product.category === 'cars' ? (
                <CarEmiCalculator 
                  carPrice={effectivePrice}
                  onSelectEmi={(option) => setSelectedEmiOption(option)}
                />
              ) : (
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-3">EMI Options</h3>
                    <div className="space-y-3">
                      {emiOptions.map((option, index) => (
                        <div
                          key={index}
                          className={`border ${
                            selectedEmiOption?.months === option.months 
                              ? "border-primary bg-primary/5" 
                              : "border-border"
                          } rounded-lg p-3 cursor-pointer`}
                          onClick={() => setSelectedEmiOption({
                            months: option.months,
                            monthlyAmount: option.monthlyAmount,
                            totalAmount: option.monthlyAmount * option.months,
                            interestRate: option.interest,
                            downPayment: 0
                          })}
                        >
                          <div className="flex justify-between">
                            <div>
                              <p className="font-medium">
                                {option.months} Month{option.months > 1 ? "s" : ""}
                                {option.interest === 0 ? " (No Interest)" : ""}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {option.interest > 0 ? `${option.interest}% interest` : "Interest-free"}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold">{formatCurrency(option.monthlyAmount)}/mo</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </>
          )}

          {/* Product Details Tabs */}
          <Tabs defaultValue="specifications" className="mt-4">
            <TabsList className="w-full">
              <TabsTrigger value="specifications" className="flex-1">Specifications</TabsTrigger>
              <TabsTrigger value="reviews" className="flex-1">Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="specifications" className="p-2">
              <div className="space-y-2 text-sm">
                {product.category === 'cars' ? (
                  <>
                    <div className="flex justify-between py-2 border-b border-border">
                      <span className="text-muted-foreground">Engine</span>
                      <span>2.5L Hybrid</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-border">
                      <span className="text-muted-foreground">Transmission</span>
                      <span>CVT Automatic</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-border">
                      <span className="text-muted-foreground">Fuel Type</span>
                      <span>Petrol + Electric</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-border">
                      <span className="text-muted-foreground">Mileage</span>
                      <span>22.3 km/l</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-border">
                      <span className="text-muted-foreground">Seating</span>
                      <span>5 Seater</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-border">
                      <span className="text-muted-foreground">Safety Rating</span>
                      <span>5 Star</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-muted-foreground">Warranty</span>
                      <span>5 Years / 100,000 km</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex justify-between py-2 border-b border-border">
                      <span className="text-muted-foreground">Brand</span>
                      <span>Premium Tech</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-border">
                      <span className="text-muted-foreground">Model</span>
                      <span>XS-2023</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-border">
                      <span className="text-muted-foreground">Warranty</span>
                      <span>1 Year</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-muted-foreground">In Box</span>
                      <span>Product, Manual, Charger</span>
                    </div>
                  </>
                )}
              </div>
            </TabsContent>
            <TabsContent value="reviews" className="p-2">
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="border-b border-border pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs">
                          {["AB", "CK", "MT"][i]}
                        </div>
                        <span className="ml-2 font-medium">
                          {["Alex B.", "Chris K.", "Maria T."][i]}
                        </span>
                      </div>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, starI) => (
                          <Star 
                            key={starI} 
                            className={`h-3 w-3 ${starI < [4, 5, 3][i] ? "text-primary fill-primary" : "text-muted-foreground"}`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm mt-2">
                      {[
                        "Great product! Works perfectly as described.",
                        "Excellent quality and fast delivery. Would recommend!",
                        "Good value for money, but battery life could be better."
                      ][i]}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {["May 2, 2025", "Apr 28, 2025", "Apr 15, 2025"][i]}
                    </p>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t border-border flex gap-3 md:px-6">
        <Button 
          variant="outline" 
          className="flex-1" 
          onClick={addToCart}
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          Add to Cart
        </Button>
        <Button 
          className="flex-1 neon-glow" 
          onClick={buyNow}
        >
          <CreditCard className="h-4 w-4 mr-2" />
          {selectedEmiOption ? "Buy with EMI" : "Buy Now"}
        </Button>
      </div>
    </Layout>
  );
};

export default ProductDetailPage;
