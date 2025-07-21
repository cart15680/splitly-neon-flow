
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SellerLayout from "@/components/seller/SellerLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Filter, 
  ArrowUpDown, 
  Check, 
  X, 
  AlertCircle,
  ScanLine,
  QrCode,
  Send,
  CreditCard
} from "lucide-react";
import { formatCurrency } from "@/utils/format";
import { products } from "@/data/dummyData";
import QrScanner from "@/components/shared/QrScanner";
import PaymentScanner from "@/components/seller/PaymentScanner";
import PaymentRequest from "@/components/seller/PaymentRequest";
import { toast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const SellerProducts = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [showScanner, setShowScanner] = useState(false);
  const [showPaymentScanner, setShowPaymentScanner] = useState(false);
  const [showPaymentRequest, setShowPaymentRequest] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<{name: string, price: number} | null>(null);
  
  // Filter products based on search term
  const filteredProducts = products.filter((product) => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Helper function to get stock status display
  const getStockStatus = (stockCount: number | undefined) => {
    // If stock is undefined, use default value of 0
    const count = stockCount ?? 0;
    
    if (count > 10) {
      return {
        label: "In Stock",
        className: "bg-green-500/10 text-green-500"
      };
    } else if (count > 0) {
      return {
        label: "Low Stock",
        className: "bg-yellow-500/10 text-yellow-500"
      };
    } else {
      return {
        label: "Out of Stock",
        className: "bg-red-500/10 text-red-500"
      };
    }
  };

  const handleLogout = () => {
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account",
    });
    navigate("/login");
  };

  const handleScanSuccess = (result: string) => {
    toast({
      title: "Product Scanned",
      description: `QR Code detected: ${result}`,
    });
    
    // Fix the comparison by checking and converting types
    const scannedProduct = products.find(p => {
      if (typeof p.id === 'number') {
        return p.id === parseInt(result);
      }
      return p.id === result;
    });
    
    if (scannedProduct) {
      setSearchTerm(scannedProduct.name);
      toast({
        title: "Product Found",
        description: `Found "${scannedProduct.name}" in your inventory`,
      });
    }
    
    setShowScanner(false);
  };
  
  const handleRequestPayment = (product: {name: string, price: number}) => {
    setSelectedProduct(product);
    setShowPaymentRequest(true);
  };

  return (
    <SellerLayout title="Manage Products">
      {/* Header actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <h2 className="text-2xl font-bold">Your Products</h2>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            onClick={() => setShowPaymentScanner(true)}
            className="flex items-center gap-2"
          >
            <CreditCard className="h-4 w-4" />
            Scan Payment
          </Button>
          <Button className="neon-glow">
            <Plus className="mr-2 h-4 w-4" />
            Add New Product
          </Button>
        </div>
      </div>

      {/* Search and filter */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex flex-wrap gap-2 w-full md:w-auto">
              <Button variant="outline" onClick={() => setShowScanner(true)} className="flex-1 md:flex-none">
                <ScanLine className="mr-2 h-4 w-4" />
                Scan Product
              </Button>
              <Button variant="outline" className="flex-1 md:flex-none">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Products table with improved mobile responsiveness */}
      <Card className="mb-6">
        <div className="overflow-x-auto w-full">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px] hidden sm:table-cell">Image</TableHead>
                <TableHead>
                  <div className="flex items-center">
                    Product
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead className="hidden md:table-cell">Category</TableHead>
                <TableHead>
                  <div className="flex items-center">
                    Price
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead className="hidden sm:table-cell">Stock</TableHead>
                <TableHead className="hidden sm:table-cell">Status</TableHead>
                <TableHead className="hidden lg:table-cell">Splitly EMI</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-6">
                    <div className="flex flex-col items-center justify-center">
                      <AlertCircle className="h-10 w-10 text-muted-foreground mb-2" />
                      <p className="text-muted-foreground">No products found</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                filteredProducts.slice(0, 10).map((product) => {
                  // Get the stock count, defaulting to a random number if undefined
                  const stockCount = product.stock ?? Math.floor(Math.random() * 100);
                  const stockStatus = getStockStatus(stockCount);
                  
                  return (
                    <TableRow key={product.id}>
                      <TableCell className="hidden sm:table-cell">
                        <div className="h-10 w-10 rounded overflow-hidden">
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2 sm:gap-0">
                          <div className="w-8 h-8 rounded overflow-hidden sm:hidden mr-2">
                            <img
                              src={product.images[0]}
                              alt={product.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <span className="line-clamp-2 md:max-w-[150px] lg:max-w-[250px]">{product.name}</span>
                        </div>
                        <span className="text-xs text-muted-foreground md:hidden block mt-1">
                          {product.category}
                        </span>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">{product.category}</TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span>{formatCurrency(product.price * (1 - (product.discount || 0) / 100))}</span>
                          {product.discount && (
                            <span className="text-xs text-muted-foreground line-through">
                              {formatCurrency(product.price)}
                            </span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">{stockCount}</TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <span className={`px-2 py-1 rounded-full text-xs ${stockStatus.className}`}>
                          {stockStatus.label}
                        </span>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        {product.bnplEligible ? (
                          <Check className="h-5 w-5 text-green-500" />
                        ) : (
                          <X className="h-5 w-5 text-muted-foreground" />
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1 md:gap-2">
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleRequestPayment({
                              name: product.name,
                              price: product.price * (1 - (product.discount || 0) / 100)
                            })}
                            title="Request payment"
                          >
                            <Send className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="hidden sm:inline-flex">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="text-destructive">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="hidden md:inline-flex">
                            <QrCode className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Logout button */}
      <Button 
        variant="destructive" 
        onClick={handleLogout}
        className="md:hidden mb-10" // Only show on mobile, since desktop has it in sidebar
      >
        Logout
      </Button>

      {/* QR Scanner Dialog */}
      <Dialog open={showScanner} onOpenChange={setShowScanner}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Scan Product QR Code</DialogTitle>
            <DialogDescription>
              Point your camera at a product QR code to quickly find it in your inventory
            </DialogDescription>
          </DialogHeader>
          <QrScanner onScanSuccess={handleScanSuccess} onClose={() => setShowScanner(false)} />
        </DialogContent>
      </Dialog>
      
      {/* Payment Scanner Dialog */}
      <PaymentScanner
        open={showPaymentScanner}
        onClose={() => setShowPaymentScanner(false)}
      />
      
      {/* Payment Request Dialog */}
      <PaymentRequest
        open={showPaymentRequest}
        onClose={() => setShowPaymentRequest(false)}
        productName={selectedProduct?.name}
        productPrice={selectedProduct?.price}
      />
    </SellerLayout>
  );
};

export default SellerProducts;
