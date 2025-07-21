
import SellerLayout from "@/components/seller/SellerLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowDown, 
  ArrowUp, 
  DollarSign, 
  Download, 
  Calendar 
} from "lucide-react";

const SellerFinancials = () => {
  return (
    <SellerLayout title="Financial Reports">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <h2 className="text-2xl font-bold">Financial Overview</h2>
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            Date Range
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Financial Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="neon-glow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Total Revenue</p>
                <h3 className="text-3xl font-bold">QAR89,990</h3>
                <span className="text-xs text-green-500 font-medium">
                  <ArrowUp className="inline h-3 w-3 mr-0.5" />
                  +18.2% from last month
                </span>
              </div>
              <div className="p-4 rounded-full bg-green-500/10 text-green-500">
                <DollarSign size={24} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Platform Fees</p>
                <h3 className="text-3xl font-bold">QAR2,699</h3>
                <span className="text-xs text-red-500 font-medium">
                  <ArrowUp className="inline h-3 w-3 mr-0.5" />
                  3% of total revenue
                </span>
              </div>
              <div className="p-4 rounded-full bg-blue-500/10 text-blue-500">
                <DollarSign size={24} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Available for Withdrawal</p>
                <h3 className="text-3xl font-bold">QAR87,291</h3>
                <Button size="sm" className="mt-2 h-7 neon-glow">Withdraw</Button>
              </div>
              <div className="p-4 rounded-full bg-primary/10 text-primary">
                <DollarSign size={24} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs for different financial views */}
      <Tabs defaultValue="transactions" className="mb-6">
        <TabsList className="grid grid-cols-4 w-full md:w-[600px]">
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="payouts">Payouts</TabsTrigger>
          <TabsTrigger value="emi">EMI Earnings</TabsTrigger>
          <TabsTrigger value="tax">Tax Reports</TabsTrigger>
        </TabsList>
        <TabsContent value="transactions">
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>Overview of your latest financial transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Transaction table will be displayed here</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="payouts">
          <Card>
            <CardHeader>
              <CardTitle>Payout History</CardTitle>
              <CardDescription>Record of your settlement payouts</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Payout history will be displayed here</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="emi">
          <Card>
            <CardHeader>
              <CardTitle>EMI Earnings</CardTitle>
              <CardDescription>Earnings from Splitly EMI purchases</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">EMI earnings will be displayed here</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="tax">
          <Card>
            <CardHeader>
              <CardTitle>Tax Reports</CardTitle>
              <CardDescription>Tax statements and GST reports</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Tax reports will be displayed here</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <p className="text-center text-muted-foreground">
        This is a placeholder for the Financial Reports page. The complete implementation will include transaction tables, graphs, and detailed financial reports.
      </p>
    </SellerLayout>
  );
};

export default SellerFinancials;
