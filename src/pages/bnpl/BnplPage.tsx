
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarClock, AlertCircle, CheckCircle2, ArrowRight } from "lucide-react";
import { formatCurrency } from "@/utils/format";

const BnplPage = () => {
  // Dummy BNPL data
  const bnplLimit = 50000;
  const usedLimit = 25000;
  const availableLimit = bnplLimit - usedLimit;
  
  // Dummy EMI plans
  const emiPlans = [
    {
      id: "emi1",
      productName: "iPhone 15 Pro",
      totalAmount: 4399,
      paidAmount: 1466,
      remainingAmount: 2933,
      emiAmount: 367,
      totalInstallments: 12,
      paidInstallments: 4,
      nextDueDate: "2025-06-15",
      status: "active"
    },
    {
      id: "emi2",
      productName: "Dell XPS 15",
      totalAmount: 3299,
      paidAmount: 1100,
      remainingAmount: 2199,
      emiAmount: 550,
      totalInstallments: 6,
      paidInstallments: 2,
      nextDueDate: "2025-05-20",
      status: "active"
    },
    {
      id: "emi3",
      productName: "Sony WH-1000XM5 Headphones",
      totalAmount: 1279,
      paidAmount: 1279,
      remainingAmount: 0,
      emiAmount: 256,
      totalInstallments: 5,
      paidInstallments: 5,
      nextDueDate: null,
      status: "completed"
    }
  ];
  
  const activeEmiPlans = emiPlans.filter(plan => plan.status === "active");
  const completedEmiPlans = emiPlans.filter(plan => plan.status === "completed");

  return (
    <Layout title="BNPL">
      <div className="p-4 pb-20 md:p-6 space-y-6">
        {/* Credit limit section removed - users can shop without limitations */}
        <Card className="neon-glow">
          <CardContent className="p-6">
            <div className="text-center">
              <h2 className="text-lg font-medium mb-4">Shop & Pay Later</h2>
              <p className="text-muted-foreground mb-4">Shop now and pay later with flexible EMI options</p>
              <Link to="/shop">
                <Button className="neon-glow">
                  Start Shopping
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
        
        {/* EMI Plans */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium">Your EMI Plans</h2>
          </div>
          
          <Tabs defaultValue="active" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="active">Active ({activeEmiPlans.length})</TabsTrigger>
              <TabsTrigger value="completed">Completed ({completedEmiPlans.length})</TabsTrigger>
            </TabsList>
            
            <TabsContent value="active" className="mt-4 space-y-4">
              {activeEmiPlans.length > 0 ? (
                activeEmiPlans.map((plan) => (
                  <Card key={plan.id} className="overflow-hidden">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="font-medium">{plan.productName}</h3>
                        <div className="flex items-center text-yellow-500 text-xs">
                          <AlertCircle className="h-3 w-3 mr-1" />
                          <span>Upcoming</span>
                        </div>
                      </div>
                      
                      <div className="mb-3">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-muted-foreground">Paid</span>
                          <span>{formatCurrency(plan.paidAmount)} / {formatCurrency(plan.totalAmount)}</span>
                        </div>
                        <Progress value={(plan.paidAmount / plan.totalAmount) * 100} className="h-1.5" />
                      </div>
                      
                      <div className="flex justify-between text-sm mb-4">
                        <div>
                          <span className="text-muted-foreground">Installments</span>
                          <p>{plan.paidInstallments} of {plan.totalInstallments} paid</p>
                        </div>
                        <div className="text-right">
                          <span className="text-muted-foreground">Next Payment</span>
                          <p className="flex items-center">
                            <CalendarClock className="h-3 w-3 mr-1" />
                            {new Date(plan.nextDueDate!).toLocaleDateString("en-IN", {
                              day: "numeric",
                              month: "short"
                            })}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="text-muted-foreground text-sm">EMI Amount</span>
                          <p className="font-semibold">{formatCurrency(plan.emiAmount)}</p>
                        </div>
                        
                        <Link to={`/emi-payment/${plan.id}`}>
                          <Button size="sm">Pay Now</Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No active EMI plans</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="completed" className="mt-4 space-y-4">
              {completedEmiPlans.length > 0 ? (
                completedEmiPlans.map((plan) => (
                  <Card key={plan.id}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="font-medium">{plan.productName}</h3>
                        <div className="flex items-center text-green-500 text-xs">
                          <CheckCircle2 className="h-3 w-3 mr-1" />
                          <span>Completed</span>
                        </div>
                      </div>
                      
                      <div className="mb-3">
                        <Progress value={100} className="h-1.5 bg-green-200" />
                      </div>
                      
                      <div className="flex justify-between text-sm">
                        <div>
                          <span className="text-muted-foreground">Total Amount</span>
                          <p className="font-medium">{formatCurrency(plan.totalAmount)}</p>
                        </div>
                        <div className="text-right">
                          <span className="text-muted-foreground">Installments</span>
                          <p className="font-medium">{plan.totalInstallments} of {plan.totalInstallments}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No completed EMI plans</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default BnplPage;
