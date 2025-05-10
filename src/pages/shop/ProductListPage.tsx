
import { useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Filter, Search, ChevronLeft } from "lucide-react";
import { categories, merchants, products } from "@/data/dummyData";
import { formatCurrency } from "@/utils/format";

const ProductListPage = () => {
  const { category } = useParams();
  const [searchParams] = useSearchParams();
  const merchantId = searchParams.get("merchant");
  
  const [searchTerm, setSearchTerm] = useState("");
  
  // Find category from dummyData
  const categoryDetails = categories.find((c) => c.id === category);
  
  // Filter products by category
  const filteredProducts = products.filter((product) => {
    const matchesCategory = product.category === category;
    const matchesMerchant = !merchantId || product.merchantId === merchantId;
    const matchesSearch = !searchTerm || 
      product.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesMerchant && matchesSearch;
  });
  
  // Get merchant if filtered by merchant
  const merchant = merchantId ? merchants.find((m) => m.id === merchantId) : null;
  
  return (
    <Layout title={merchant ? merchant.name : categoryDetails?.name || "Products"}>
      <div className="p-4 pb-20 md:p-6 space-y-4">
        {/* Back button and search bar */}
        <div className="flex items-center gap-2">
          <Link to="/shop" className="mr-2">
            <Button variant="ghost" size="icon">
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </Link>
          
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search products..." 
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Products grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredProducts.map((product) => (
              <Link to={`/product/${product.id}`} key={product.id}>
                <Card className="h-full neon-glow overflow-hidden">
                  <div className="h-36 overflow-hidden">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                    {product.bnplEligible && (
                      <div className="absolute top-2 right-2 bg-primary/90 text-xs rounded-full px-2 py-1 text-primary-foreground">
                        EMI Available
                      </div>
                    )}
                  </div>
                  <CardContent className="p-3">
                    <h3 className="font-medium text-sm line-clamp-2 h-10">
                      {product.name}
                    </h3>
                    <div className="mt-2 flex items-baseline gap-2">
                      <span className="font-bold">
                        {formatCurrency(product.price * (1 - (product.discount || 0) / 100))}
                      </span>
                      {product.discount && (
                        <span className="text-xs text-muted-foreground line-through">
                          {formatCurrency(product.price)}
                        </span>
                      )}
                    </div>
                    {product.discount && (
                      <span className="text-xs text-primary">
                        {product.discount}% off
                      </span>
                    )}
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-10">
            <p className="text-muted-foreground text-center">
              No products found{searchTerm ? ` for "${searchTerm}"` : ""}.
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ProductListPage;
