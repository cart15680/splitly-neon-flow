
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ArrowRight, ArrowUp, ArrowDown, Package, ShoppingCart, DollarSign, Users, Car, Calendar, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import SellerLayout from "@/components/seller/SellerLayout";
import CarInventoryCard from "@/components/cars/CarInventoryCard";
import { products } from "@/data/dummyData";

const SellerDashboard = () => {
  // Filter cars from products
  const carProducts = products.filter(product => product.category === 'cars');
  
  // Mock data enhanced for car showroom
  const stats = [
    {
      title: "Sales Today",
      value: "QAR428,900",
      change: "+24.8%",
      isPositive: true,
      icon: ShoppingCart,
      color: "bg-blue-500/10 text-blue-500"
    },
    {
      title: "Cars in Inventory",
      value: carProducts.length.toString(),
      change: "+2 this week",
      isPositive: true,
      icon: Car,
      color: "bg-green-500/10 text-green-500"
    },
    {
      title: "Pending Payout",
      value: "QAR1,245,899",
      change: "Processing",
      icon: DollarSign,
      color: "bg-yellow-500/10 text-yellow-500"
    },
    {
      title: "Test Drives Today",
      value: "8",
      change: "+33.3%",
      isPositive: true,
      icon: Calendar,
      color: "bg-purple-500/10 text-purple-500"
    },
    {
      title: "EMI Applications",
      value: "15",
      change: "+25%",
      isPositive: true,
      icon: TrendingUp,
      color: "bg-orange-500/10 text-orange-500"
    },
    {
      title: "Avg. Car Price",
      value: "QAR95,800",
      change: "+2.1%",
      isPositive: true,
      icon: DollarSign,
      color: "bg-cyan-500/10 text-cyan-500"
    }
  ];

  const recentOrders = [
    { id: "ORD-5592", customer: "Ahmed Al-Rashid", product: "Toyota Camry 2024", amount: "QAR98,000", status: "emi_approved", emiMonths: 24 },
    { id: "ORD-5591", customer: "Sarah Mohammed", product: "Honda Accord 2024", amount: "QAR105,000", status: "test_drive_scheduled", emiMonths: 36 },
    { id: "ORD-5590", customer: "Khalid Hassan", product: "Nissan Altima 2024", amount: "QAR89,000", status: "completed", emiMonths: 24 },
    { id: "ORD-5589", customer: "Fatima Al-Zahra", product: "Hyundai Sonata 2024", amount: "QAR95,000", status: "emi_processing", emiMonths: 36 }
  ];

  return (
    <SellerLayout title="Seller Dashboard">
      {/* Welcome section */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-2">Welcome back!</h2>
        <p className="text-muted-foreground">Here's what's happening with your store today.</p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {stats.map((stat, index) => (
          <Card key={index} className="neon-glow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">{stat.title}</p>
                  <div className="flex items-baseline">
                    <h3 className="text-2xl font-bold">{stat.value}</h3>
                    {stat.change && (
                      <span className={`ml-2 text-xs font-medium ${stat.isPositive ? "text-green-500" : "text-muted-foreground"}`}>
                        {stat.isPositive && <ArrowUp className="inline h-3 w-3 mr-0.5" />}
                        {!stat.isPositive && stat.change !== "Processing" && <ArrowDown className="inline h-3 w-3 mr-0.5" />}
                        {stat.change}
                      </span>
                    )}
                  </div>
                </div>
                <div className={`p-3 rounded-full ${stat.color}`}>
                  <stat.icon size={20} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Car Inventory Overview */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Car Inventory</h3>
          <Link to="/seller/products">
            <Button variant="outline" size="sm">
              Manage All Cars
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {carProducts.slice(0, 3).map((car) => (
            <CarInventoryCard
              key={car.id}
              car={{
                id: car.id,
                name: car.name,
                price: car.price * (1 - (car.discount || 0) / 100),
                stock: car.stock || 0,
                category: car.category,
                images: car.images,
                emiInterest: 10 + Math.floor(Math.random() * 5) // Random 10-15%
              }}
              onEmiSetup={(carId) => console.log('EMI setup for:', carId)}
              onPriceUpdate={(carId) => console.log('Price update for:', carId)}
            />
          ))}
        </div>
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Link to="/seller/products">
          <Card className="hover:shadow-md transition-shadow neon-glow">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <h3 className="font-medium text-lg">Manage Products</h3>
                <p className="text-muted-foreground text-sm">Add or edit your store products</p>
              </div>
              <ArrowRight className="h-5 w-5 text-muted-foreground" />
            </CardContent>
          </Card>
        </Link>
        <Link to="/seller/orders">
          <Card className="hover:shadow-md transition-shadow neon-glow">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <h3 className="font-medium text-lg">View Orders</h3>
                <p className="text-muted-foreground text-sm">Manage customer orders</p>
              </div>
              <ArrowRight className="h-5 w-5 text-muted-foreground" />
            </CardContent>
          </Card>
        </Link>
        <Link to="/seller/financials">
          <Card className="hover:shadow-md transition-shadow neon-glow">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <h3 className="font-medium text-lg">Financial Overview</h3>
                <p className="text-muted-foreground text-sm">Check payouts and revenue</p>
              </div>
              <ArrowRight className="h-5 w-5 text-muted-foreground" />
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Recent orders */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>Your latest customer orders</CardDescription>
          </div>
          <Link to="/seller/orders">
            <Button variant="outline" size="sm">
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-3 bg-card/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback>{order.customer.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-sm">{order.product}</p>
                    <p className="text-xs text-muted-foreground">{order.customer} • {order.id}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="font-medium text-sm">{order.amount}</p>
                    {order.emiMonths && (
                      <p className="text-xs text-muted-foreground">
                        {order.emiMonths}mo EMI
                      </p>
                    )}
                  </div>
                  <span 
                    className={`text-xs px-2 py-1 rounded-full ${
                      order.status === 'completed' ? 'bg-green-500/10 text-green-500' : 
                      order.status === 'emi_approved' ? 'bg-blue-500/10 text-blue-500' :
                      order.status === 'emi_processing' ? 'bg-orange-500/10 text-orange-500' :
                      order.status === 'test_drive_scheduled' ? 'bg-purple-500/10 text-purple-500' :
                      'bg-yellow-500/10 text-yellow-500'
                    }`}
                  >
                    {order.status.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </SellerLayout>
  );
};

export default SellerDashboard;
