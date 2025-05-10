import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, CreditCard, Plus } from "lucide-react";
import { products } from "@/data/dummyData";
import { formatCurrency } from "@/utils/format";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { productId, emiOption } = location.state || {};
  
  const product = products.find(p => p.id === productId);
  
  const [address, setAddress] = useState({
    name: "Alex Johnson",
    phone: "9876543210",
    address: "",
    city: "",
    state: "",
    pincode: ""
  });

  const [useExistingAddress, setUseExistingAddress] = useState(true);
  
  if (!product) {
    navigate("/shop");
    return null;
  }

  const effectivePrice = product.price * (1 - (product.discount || 0) / 100);
  const shippingFee = 99;
  const totalAmount = effectivePrice + shippingFee;

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddress(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/payment/confirm", { 
      state: { 
        productId, 
        emiOption,
        totalAmount
      }
    });
  };

  return (
    <Layout title="Checkout">
      <div className="p-4 pb-28 md:p-6 space-y-6">
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

        {/* Order Summary */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Order Summary</h2>
          <Card>
            <CardContent className="p-4">
              <div className="flex gap-3">
                <div className="w-20 h-20 overflow-hidden rounded-md">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium line-clamp-2">{product.name}</h3>
                  <div className="flex items-baseline mt-1">
                    <span className="font-semibold">
                      {formatCurrency(effectivePrice)}
                    </span>
                    {product.discount && (
                      <span className="text-xs text-muted-foreground line-through ml-2">
                        {formatCurrency(product.price)}
                      </span>
                    )}
                  </div>
                  {emiOption && (
                    <div className="mt-1 text-sm">
                      <span className="text-primary">
                        EMI: {formatCurrency(emiOption.monthlyAmount)}/mo for {emiOption.months} months
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Price Details */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Price Details</h2>
          <Card>
            <CardContent className="p-4 space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Price</span>
                <span>{formatCurrency(product.price)}</span>
              </div>
              {product.discount && (
                <div className="flex justify-between text-primary">
                  <span>Discount</span>
                  <span>- {formatCurrency(product.price - effectivePrice)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping Fee</span>
                <span>{formatCurrency(shippingFee)}</span>
              </div>
              <div className="border-t border-border pt-3 flex justify-between font-semibold">
                <span>Total Amount</span>
                <span>{formatCurrency(totalAmount)}</span>
              </div>
              {emiOption && (
                <div className="border-t border-border pt-3 flex justify-between text-primary">
                  <span>Your EMI Plan</span>
                  <span>{formatCurrency(emiOption.monthlyAmount)}/mo × {emiOption.months}</span>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Delivery Address */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Delivery Address</h2>
          
          {/* Existing Address Option */}
          <div className="mb-4">
            <div className="flex items-start space-x-3">
              <Checkbox 
                id="use-existing" 
                checked={useExistingAddress}
                onCheckedChange={(checked) => setUseExistingAddress(checked === true)}
              />
              <div>
                <Label htmlFor="use-existing" className="font-medium">Use existing address</Label>
                {useExistingAddress && (
                  <div className="text-sm mt-2 space-y-1">
                    <p>{address.name}</p>
                    <p>42 Main Street, Apartment 3B</p>
                    <p>Mumbai, Maharashtra - 400001</p>
                    <p>Phone: {address.phone}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* New Address Form */}
          {!useExistingAddress && (
            <Card>
              <CardContent className="p-4">
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={address.name}
                        onChange={handleAddressChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={address.phone}
                        onChange={handleAddressChange}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      name="address"
                      value={address.address}
                      onChange={handleAddressChange}
                      placeholder="House/Flat No., Building, Street, Area"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        name="city"
                        value={address.city}
                        onChange={handleAddressChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State</Label>
                      <Input
                        id="state"
                        name="state"
                        value={address.state}
                        onChange={handleAddressChange}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pincode">PIN Code</Label>
                    <Input
                      id="pincode"
                      name="pincode"
                      value={address.pincode}
                      onChange={handleAddressChange}
                    />
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Add New Address Button */}
          {useExistingAddress && (
            <Button 
              variant="outline"
              onClick={() => setUseExistingAddress(false)}
              className="w-full mt-2"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add New Address
            </Button>
          )}
        </div>
      </div>

      {/* Bottom Action */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t border-border flex gap-3">
        <Button 
          className="w-full neon-glow"
          onClick={handleSubmit}
        >
          <CreditCard className="h-4 w-4 mr-2" />
          Proceed to Payment
        </Button>
      </div>
    </Layout>
  );
};

export default CheckoutPage;
