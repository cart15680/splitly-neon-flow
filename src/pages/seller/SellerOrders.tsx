
import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  Search,
  Filter,
  ArrowUpDown,
  AlertCircle,
  Eye,
  Download,
  LogOut
} from "lucide-react";
import { formatCurrency } from "@/utils/format";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";

const SellerOrders = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  // Mock orders data
  const orders = [
    {
      id: "ORD-5598",
      customer: "Rahul Sharma",
      customerInitial: "RS",
      product: "Apple MacBook Pro M2",
      date: "2023-05-10",
      amount: 4799,
      status: "completed",
      payment: "EMI",
      paymentStatus: "paid"
    },
    {
      id: "ORD-5597",
      customer: "Priya Singh",
      customerInitial: "PS",
      product: "Samsung 55\" QLED TV",
      date: "2023-05-09",
      amount: 3299,
      status: "processing",
      payment: "EMI",
      paymentStatus: "paid"
    },
    {
      id: "ORD-5596",
      customer: "Aditya Patel",
      customerInitial: "AP",
      product: "Sony PlayStation 5",
      date: "2023-05-09",
      amount: 1799,
      status: "completed",
      payment: "Full",
      paymentStatus: "paid"
    },
    {
      id: "ORD-5595",
      customer: "Neha Gupta",
      customerInitial: "NG",
      product: "Bose Noise Cancelling Headphones",
      date: "2023-05-08",
      amount: 1099,
      status: "pending",
      payment: "EMI",
      paymentStatus: "pending"
    },
    {
      id: "ORD-5594",
      customer: "Vikram Singh",
      customerInitial: "VS",
      product: "iPhone 15 Pro 256GB",
      date: "2023-05-08",
      amount: 4999,
      status: "refunded",
      payment: "EMI",
      paymentStatus: "refunded"
    }
  ];

  // Filter orders based on search term
  const filteredOrders = orders.filter((order) =>
    order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.product.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Function to get status badge styling
  const getStatusBadge = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-500 text-white";
      case "processing":
        return "bg-blue-500 text-white";
      case "pending":
        return "bg-yellow-500 text-white";
      case "refunded":
        return "bg-red-500 text-white";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const handleLogout = () => {
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account",
    });
    navigate("/login");
  };

  return (
    <SellerLayout title="Manage Orders">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <h2 className="text-2xl font-bold">Orders</h2>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
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
                placeholder="Search orders by ID, customer, or product..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="md:w-auto">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Orders table with improved mobile responsiveness */}
      <Card className="mb-6">
        <div className="overflow-x-auto w-full">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">
                  <div className="flex items-center">
                    Order ID
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead>Customer</TableHead>
                <TableHead className="hidden md:table-cell">Product</TableHead>
                <TableHead className="hidden sm:table-cell">
                  <div className="flex items-center">
                    Date
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead>
                  <div className="flex items-center">
                    Amount
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden sm:table-cell">Payment</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-6">
                    <div className="flex flex-col items-center justify-center">
                      <AlertCircle className="h-10 w-10 text-muted-foreground mb-2" />
                      <p className="text-muted-foreground">No orders found</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                filteredOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>{order.customerInitial}</AvatarFallback>
                        </Avatar>
                        <span className="hidden sm:inline">{order.customer}</span>
                        <span className="sm:hidden">{order.customerInitial}</span>
                      </div>
                      <span className="md:hidden text-xs text-muted-foreground block mt-1 line-clamp-1">
                        {order.product}
                      </span>
                    </TableCell>
                    <TableCell className="hidden md:table-cell max-w-[200px] truncate">{order.product}</TableCell>
                    <TableCell className="hidden sm:table-cell">{order.date}</TableCell>
                    <TableCell>{formatCurrency(order.amount)}</TableCell>
                    <TableCell>
                      <Badge className={getStatusBadge(order.status)}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <div className="flex flex-col">
                        <span className="text-xs font-medium">{order.payment}</span>
                        <span className={`text-xs ${
                          order.paymentStatus === 'paid' ? 'text-green-500' :
                          order.paymentStatus === 'refunded' ? 'text-red-500' :
                          'text-yellow-500'
                        }`}>
                          {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="hidden sm:inline-flex">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
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
        <LogOut className="mr-2 h-4 w-4" />
        Logout
      </Button>
    </SellerLayout>
  );
};

export default SellerOrders;
