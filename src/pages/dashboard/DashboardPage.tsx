
import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ShoppingCart, CreditCard, History, ArrowRight, ChevronRight } from "lucide-react";
import { activeEMIs, recentTransactions, currentUser } from "@/data/dummyData";
import { formatCurrency } from "@/utils/format";

const DashboardPage = () => {
  const [creditLimit] = useState(currentUser.creditLimit);
  const [availableLimit] = useState(currentUser.availableLimit);
  const usedLimit = creditLimit - availableLimit;
  const percentageUsed = (usedLimit / creditLimit) * 100;

  return (
    <Layout title="Dashboard">
      <div className="p-4 pb-20 md:p-6 space-y-6">
        {/* Credit Limit Card */}
        <Card className="w-full bg-gradient-to-r from-blue-900 to-blue-600 border-0 overflow-hidden">
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-white text-lg font-medium opacity-80">Total Credit Limit</h2>
                <p className="text-white text-3xl font-bold mt-1">
                  {formatCurrency(creditLimit)}
                </p>
              </div>
              <div className="bg-white/10 p-2 rounded-full">
                <CreditCard className="h-6 w-6 text-white" />
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-white/80">Available Limit</span>
                <span className="text-white font-medium">{formatCurrency(availableLimit)}</span>
              </div>
              
              <Progress 
                value={percentageUsed} 
                className="h-2 bg-white/20" 
              />
              
              <div className="flex justify-between text-sm">
                <span className="text-white/80">Used</span>
                <span className="text-white/80">{formatCurrency(usedLimit)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Quick Actions</h2>
          <div className="grid grid-cols-3 gap-4">
            <Link to="/shop">
              <Card className="h-24 flex flex-col items-center justify-center neon-glow">
                <CardContent className="flex flex-col items-center justify-center p-4 h-full">
                  <ShoppingCart className="h-6 w-6 mb-2 text-primary" />
                  <span className="text-sm">Shop</span>
                </CardContent>
              </Card>
            </Link>
            
            <Link to="/bnpl">
              <Card className="h-24 flex flex-col items-center justify-center neon-glow">
                <CardContent className="flex flex-col items-center justify-center p-4 h-full">
                  <CreditCard className="h-6 w-6 mb-2 text-primary" />
                  <span className="text-sm">Pay EMI</span>
                </CardContent>
              </Card>
            </Link>
            
            <Link to="/history">
              <Card className="h-24 flex flex-col items-center justify-center neon-glow">
                <CardContent className="flex flex-col items-center justify-center p-4 h-full">
                  <History className="h-6 w-6 mb-2 text-primary" />
                  <span className="text-sm">History</span>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>

        {/* Active EMIs */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold">Active EMIs</h2>
            <Link to="/bnpl">
              <Button variant="ghost" size="sm" className="text-primary">
                View All
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </div>
          
          <div className="space-y-4">
            {activeEMIs.map((emi) => (
              <Card key={emi.id} className="neon-glow">
                <CardContent className="p-4">
                  <div className="flex justify-between mb-2">
                    <div>
                      <h3 className="font-medium">{emi.productName}</h3>
                      <p className="text-sm text-muted-foreground">{emi.merchantName}</p>
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs ${
                      emi.status === 'active' ? 'bg-primary/10 text-primary' : 
                      emi.status === 'overdue' ? 'bg-destructive/10 text-destructive' : 
                      'bg-muted text-muted-foreground'
                    }`}>
                      {emi.status.charAt(0).toUpperCase() + emi.status.slice(1)}
                    </div>
                  </div>
                  
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Total Amount</span>
                      <span className="font-medium">{formatCurrency(emi.totalAmount)}</span>
                    </div>
                    
                    <Progress 
                      value={(emi.paidAmount / emi.totalAmount) * 100} 
                      className="h-2" 
                    />
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Next Due Date</span>
                      <span>{new Date(emi.nextDueDate).toLocaleDateString()}</span>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Next Installment</span>
                      <span className="font-medium">{formatCurrency(emi.installmentAmount)}</span>
                    </div>
                  </div>
                  
                  <Link to={`/emi-payment/${emi.id}`}>
                    <Button className="w-full mt-4" variant="outline">
                      Pay Installment
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Transactions */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold">Recent Transactions</h2>
            <Link to="/history">
              <Button variant="ghost" size="sm" className="text-primary">
                View All
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </div>
          
          <Card>
            <CardContent className="p-0">
              {recentTransactions.slice(0, 3).map((transaction, index) => (
                <div 
                  key={transaction.id} 
                  className={`p-4 flex justify-between items-center ${
                    index !== recentTransactions.length - 1 ? "border-b border-border" : ""
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                      transaction.type === 'purchase' ? 'bg-primary/10' : 
                      transaction.type === 'refund' ? 'bg-green-500/10' : 
                      'bg-secondary/10'
                    }`}>
                      {transaction.type === 'purchase' ? (
                        <ShoppingCart className="h-5 w-5 text-primary" />
                      ) : transaction.type === 'refund' ? (
                        <ArrowRight className="h-5 w-5 text-green-500" />
                      ) : (
                        <CreditCard className="h-5 w-5 text-secondary" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">
                        {transaction.type === 'purchase' ? 'Purchase' : 
                         transaction.type === 'refund' ? 'Refund' : 
                         'EMI Payment'}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {transaction.productName || 'EMI Payment'}
                        {transaction.merchantName && ` • ${transaction.merchantName}`}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-medium ${
                      transaction.type === 'refund' ? 'text-green-500' : ''
                    }`}>
                      {transaction.type === 'refund' ? '+' : '-'} {formatCurrency(transaction.amount)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(transaction.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardPage;
