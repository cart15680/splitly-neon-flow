
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ArrowRight, ArrowUp, ArrowDown, Package, ShoppingCart, DollarSign, Users } from "lucide-react";
import { Link } from "react-router-dom";
import SellerLayout from "@/components/seller/SellerLayout";

const SellerDashboard = () => {
  // Mock data
  const stats = [
    {
      title: "Sales Today",
      value: "₹24,565",
      change: "+12.5%",
      isPositive: true,
      icon: ShoppingCart,
      color: "bg-blue-500/10 text-blue-500"
    },
    {
      title: "Total Products",
      value: "145",
      change: "+3 new",
      isPositive: true,
      icon: Package,
      color: "bg-green-500/10 text-green-500"
    },
    {
      title: "Pending Payout",
      value: "₹1,45,225",
      change: "Processing",
      icon: DollarSign,
      color: "bg-yellow-500/10 text-yellow-500"
    },
    {
      title: "New Customers",
      value: "32",
      change: "+18.2%",
      isPositive: true,
      icon: Users,
      color: "bg-purple-500/10 text-purple-500"
    }
  ];

  const recentOrders = [
    { id: "ORD-5592", customer: "Raj Mehta", product: "Apple iPhone 15", amount: "₹84,900", status: "completed" },
    { id: "ORD-5591", customer: "Priya Shah", product: "Samsung Galaxy S23", amount: "₹74,999", status: "processing" },
    { id: "ORD-5590", customer: "Vikram Singh", product: "Sony Headphones", amount: "₹24,990", status: "completed" },
    { id: "ORD-5589", customer: "Neha Gupta", product: "Bluetooth Speaker", amount: "₹3,499", status: "pending" }
  ];

  return (
    <SellerLayout title="Seller Dashboard">
      {/* Welcome section */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-2">Welcome back!</h2>
        <p className="text-muted-foreground">Here's what's happening with your store today.</p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
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
                  <p className="font-medium text-sm">{order.amount}</p>
                  <span 
                    className={`text-xs px-2 py-1 rounded-full ${
                      order.status === 'completed' ? 'bg-green-500/10 text-green-500' : 
                      order.status === 'processing' ? 'bg-blue-500/10 text-blue-500' :
                      'bg-yellow-500/10 text-yellow-500'
                    }`}
                  >
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
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
