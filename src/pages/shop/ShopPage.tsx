
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, ArrowRight } from "lucide-react";
import { categories, merchants, products } from "@/data/dummyData";
import { formatCurrency } from "@/utils/format";
import { useIsMobile } from "@/hooks/use-mobile";

const ShopPage = () => {
  // Get featured merchants
  const featuredMerchants = merchants.filter(merchant => merchant.featured);
  const isMobile = useIsMobile();

  return (
    <Layout title="Splitly Shop">
      <div className="p-4 pb-20 md:p-6 space-y-6">
        {/* Search bar */}
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search for products, merchants..." 
            className="pl-10"
          />
        </div>

        {/* Categories */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Categories</h2>
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {categories.map((category) => (
              <Link to={`/shop/${category.id}`} key={category.id}>
                <Card className="h-24 neon-glow">
                  <CardContent className="flex flex-col items-center justify-center p-3 h-full">
                    <span className="text-2xl mb-1">{category.icon}</span>
                    <span className="text-sm text-center">{category.name}</span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Featured Merchants */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Featured Merchants</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
            {featuredMerchants.slice(0, isMobile ? 4 : 6).map((merchant) => (
              <Link
                to={`/shop/${merchant.category}?merchant=${merchant.id}`}
                key={merchant.id}
                className="min-w-0"
              >
                <Card className="neon-glow h-full">
                  <CardContent className="p-3 flex flex-col items-center justify-center">
                    <div className="w-full h-20 rounded-md overflow-hidden mb-2">
                      <img
                        src={merchant.logo}
                        alt={merchant.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="font-medium text-sm text-center line-clamp-1">{merchant.name}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          {featuredMerchants.length > (isMobile ? 4 : 6) && (
            <div className="mt-2 flex justify-end">
              <Link to="/shop/all-merchants" className="text-primary text-sm flex items-center">
                View All
                <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
          )}
        </div>

        {/* Featured Products */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold">Featured Products</h2>
            <Link to="/shop/electronics" className="text-primary text-sm flex items-center">
              View All
              <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.slice(0, isMobile ? 4 : 8).map((product) => (
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
                        Splitly EMI
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
        </div>

        {/* Recent Viewed */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold">Recently Viewed</h2>
            <Link to="/history" className="text-primary text-sm flex items-center">
              See All
              <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {products.slice(2, 2 + (isMobile ? 4 : 6)).map((product) => (
              <Link
                to={`/product/${product.id}`}
                key={product.id}
              >
                <Card className="neon-glow h-full">
                  <div className="h-28 overflow-hidden">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-3">
                    <h3 className="font-medium text-xs line-clamp-2 h-8">
                      {product.name}
                    </h3>
                    <p className="text-sm font-semibold mt-1">
                      {formatCurrency(product.price * (1 - (product.discount || 0) / 100))}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ShopPage;
