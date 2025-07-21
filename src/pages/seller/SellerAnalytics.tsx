
import { useState } from "react";
import SellerLayout from "@/components/seller/SellerLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowUp, ArrowDown } from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const SellerAnalytics = () => {
  const [period, setPeriod] = useState("monthly");

  // Mock data for sales chart
  const salesData = [
    { name: "Jan", sales: 4000, orders: 24, profit: 2400 },
    { name: "Feb", sales: 3000, orders: 18, profit: 1800 },
    { name: "Mar", sales: 5000, orders: 29, profit: 3100 },
    { name: "Apr", sales: 2780, orders: 15, profit: 1500 },
    { name: "May", sales: 8900, orders: 45, profit: 5400 },
    { name: "Jun", sales: 2390, orders: 14, profit: 1400 },
    { name: "Jul", sales: 3490, orders: 19, profit: 2100 },
    { name: "Aug", sales: 4900, orders: 28, profit: 3000 },
    { name: "Sep", sales: 3700, orders: 21, profit: 2200 },
    { name: "Oct", sales: 5100, orders: 30, profit: 3100 },
    { name: "Nov", sales: 6200, orders: 37, profit: 3800 },
    { name: "Dec", sales: 7800, orders: 49, profit: 4900 }
  ];

  // Monthly revenue data
  const monthlyRevenue = [
    { name: "Jan", emi: 75000, full: 125000 },
    { name: "Feb", emi: 60000, full: 90000 },
    { name: "Mar", emi: 90000, full: 110000 },
    { name: "Apr", emi: 55000, full: 75000 },
    { name: "May", emi: 120000, full: 170000 },
    { name: "Jun", emi: 50000, full: 70000 },
    { name: "Jul", emi: 70000, full: 100000 },
    { name: "Aug", emi: 95000, full: 120000 },
    { name: "Sep", emi: 80000, full: 110000 },
    { name: "Oct", emi: 105000, full: 140000 },
    { name: "Nov", emi: 125000, full: 165000 },
    { name: "Dec", emi: 150000, full: 180000 }
  ];

  // Top selling products
  const topProducts = [
    { name: "iPhone 15 Pro Max", sales: 155, revenue: 2078250, percentage: 25 },
    { name: "Samsung Galaxy S23 Ultra", sales: 120, revenue: 1679880, percentage: 20 },
    { name: "MacBook Pro M2", sales: 85, revenue: 1699150, percentage: 15 },
    { name: "Sony PlayStation 5", sales: 70, revenue: 559860, percentage: 12 },
    { name: "iPad Pro 12.9\"", sales: 55, revenue: 715000, percentage: 9 }
  ];

  // Summary stats
  const summaryStats = [
    { title: "Sales Revenue", value: "QAR18.5L", change: "+12.5%", isPositive: true },
    { title: "Units Sold", value: "845", change: "+8.2%", isPositive: true },
    { title: "Avg Order Value", value: "QAR21,893", change: "+4.3%", isPositive: true },
    { title: "Conversion Rate", value: "3.2%", change: "-0.5%", isPositive: false },
  ];

  return (
    <SellerLayout title="Analytics Dashboard">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <h2 className="text-2xl font-bold">Analytics Overview</h2>
        {/* Period selector */}
        <div className="flex">
          <Tabs defaultValue="monthly" value={period} onValueChange={setPeriod} className="w-full">
            <TabsList className="grid grid-cols-3 w-[300px]">
              <TabsTrigger value="weekly">Weekly</TabsTrigger>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
              <TabsTrigger value="yearly">Yearly</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {summaryStats.map((stat, index) => (
          <Card key={index} className="neon-glow">
            <CardContent className="p-6">
              <div className="flex flex-col">
                <p className="text-sm font-medium text-muted-foreground mb-1">{stat.title}</p>
                <div className="flex items-baseline">
                  <h3 className="text-2xl font-bold">{stat.value}</h3>
                  <span className={`ml-2 text-xs font-medium ${stat.isPositive ? "text-green-500" : "text-red-500"}`}>
                    {stat.isPositive ? <ArrowUp className="inline h-3 w-3 mr-0.5" /> : <ArrowDown className="inline h-3 w-3 mr-0.5" />}
                    {stat.change}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Sales Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Sales Trend */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Sales Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={salesData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#282828" />
                  <XAxis dataKey="name" stroke="#888888" />
                  <YAxis stroke="#888888" />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#1a1a1a", border: "1px solid #333" }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="sales"
                    name="Sales (QAR)"
                    stroke="#00FFD1"
                    activeDot={{ r: 8 }}
                    strokeWidth={2}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="orders" 
                    name="Orders" 
                    stroke="#1DB954" 
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Top Selling Products */}
        <Card>
          <CardHeader>
            <CardTitle>Top Selling Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.slice(0, 4).map((product, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div>
                    <p className="font-medium text-sm">{product.name}</p>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <span>{product.sales} units</span>
                      <span className="mx-1">•</span>
                      <span>QAR{(product.revenue / 100000).toFixed(1)}L</span>
                    </div>
                  </div>
                  <span className="text-sm font-semibold">{product.percentage}%</span>
                </div>
              ))}
              <Button variant="link" className="text-primary w-full mt-2">
                View All Products
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Analysis */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Revenue Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={monthlyRevenue}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#282828" />
                <XAxis dataKey="name" stroke="#888888" />
                <YAxis stroke="#888888" />
                <Tooltip
                  formatter={(value) => [`QAR${value.toLocaleString()}`, null]}
                  contentStyle={{ backgroundColor: "#1a1a1a", border: "1px solid #333" }}
                />
                <Legend />
                <Bar dataKey="emi" name="EMI Payments" stackId="a" fill="#00FFD1" radius={[4, 4, 0, 0]} />
                <Bar dataKey="full" name="Full Payments" stackId="a" fill="#1DB954" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </SellerLayout>
  );
};

export default SellerAnalytics;
