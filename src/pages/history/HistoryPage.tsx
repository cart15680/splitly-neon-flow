
import { useState } from "react";
import Layout from "@/components/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Download } from "lucide-react";
import { formatCurrency, formatDate } from "@/utils/format";

const HistoryPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Dummy transaction history
  const transactions = [
    {
      id: "txn1",
      type: "purchase",
      title: "iPhone 15 Pro",
      merchant: "Apple Store",
      amount: 120000,
      date: "2025-05-01",
      status: "completed",
    },
    {
      id: "txn2",
      type: "emi",
      title: "iPhone 15 Pro - EMI 1",
      merchantRef: "Apple Store",
      amount: 10000,
      date: "2025-05-01",
      status: "paid",
    },
    {
      id: "txn3",
      type: "emi",
      title: "iPhone 15 Pro - EMI 2",
      merchantRef: "Apple Store",
      amount: 10000,
      date: "2025-04-01",
      status: "paid",
    },
    {
      id: "txn4",
      type: "purchase",
      title: "Dell XPS 15",
      merchant: "Dell Official",
      amount: 89990,
      date: "2025-03-15",
      status: "completed",
    },
    {
      id: "txn5",
      type: "emi",
      title: "Dell XPS 15 - EMI 1",
      merchantRef: "Dell Official",
      amount: 15000,
      date: "2025-03-15",
      status: "paid",
    },
    {
      id: "txn6",
      type: "emi",
      title: "Dell XPS 15 - EMI 2",
      merchantRef: "Dell Official",
      amount: 15000,
      date: "2025-04-15",
      status: "upcoming",
      dueDate: "2025-05-15",
    },
    {
      id: "txn7",
      type: "purchase",
      title: "Sony WH-1000XM5 Headphones",
      merchant: "Croma",
      amount: 35000,
      date: "2025-01-10",
      status: "completed",
    },
  ];

  // Filter transactions based on tab and search
  const filterTransactions = (type: string | null) => {
    return transactions
      .filter(txn => !type || txn.type === type)
      .filter(txn => 
        txn.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (txn.merchant?.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (txn.merchantRef?.toLowerCase().includes(searchTerm.toLowerCase()))
      )
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  };

  const allTransactions = filterTransactions(null);
  const purchaseTransactions = filterTransactions("purchase");
  const emiTransactions = filterTransactions("emi");
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
      case "paid":
        return "bg-green-500/20 text-green-500";
      case "upcoming":
        return "bg-yellow-500/20 text-yellow-500";
      case "overdue":
        return "bg-red-500/20 text-red-500";
      default:
        return "bg-muted text-muted-foreground";
    }
  };
  
  return (
    <Layout title="Transaction History">
      <div className="p-4 pb-20 md:p-6 space-y-6">
        {/* Search bar */}
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search transactions..." 
            className="pl-10"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        
        {/* Tabs */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="purchases">Purchases</TabsTrigger>
            <TabsTrigger value="emis">EMIs</TabsTrigger>
          </TabsList>
          
          {/* All Transactions */}
          <TabsContent value="all">
            <div className="space-y-3 mt-4">
              {allTransactions.length > 0 ? (
                allTransactions.map((txn) => (
                  <TransactionCard key={txn.id} transaction={txn} />
                ))
              ) : (
                <EmptyState search={searchTerm} />
              )}
            </div>
          </TabsContent>
          
          {/* Purchases */}
          <TabsContent value="purchases">
            <div className="space-y-3 mt-4">
              {purchaseTransactions.length > 0 ? (
                purchaseTransactions.map((txn) => (
                  <TransactionCard key={txn.id} transaction={txn} />
                ))
              ) : (
                <EmptyState type="purchases" search={searchTerm} />
              )}
            </div>
          </TabsContent>
          
          {/* EMIs */}
          <TabsContent value="emis">
            <div className="space-y-3 mt-4">
              {emiTransactions.length > 0 ? (
                emiTransactions.map((txn) => (
                  <TransactionCard key={txn.id} transaction={txn} />
                ))
              ) : (
                <EmptyState type="EMIs" search={searchTerm} />
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

interface TransactionCardProps {
  transaction: {
    id: string;
    type: string;
    title: string;
    merchant?: string;
    merchantRef?: string;
    amount: number;
    date: string;
    status: string;
    dueDate?: string;
  };
}

const TransactionCard = ({ transaction }: TransactionCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
      case "paid":
        return "bg-green-500/20 text-green-500";
      case "upcoming":
        return "bg-yellow-500/20 text-yellow-500";
      case "overdue":
        return "bg-red-500/20 text-red-500";
      default:
        return "bg-muted text-muted-foreground";
    }
  };
  
  return (
    <Card>
      <CardContent className="p-4 flex items-center justify-between">
        <div className="flex-1">
          <div className="flex justify-between">
            <h3 className="font-medium">{transaction.title}</h3>
            <Badge variant="outline" className={getStatusColor(transaction.status)}>
              {transaction.status}
            </Badge>
          </div>
          
          <div className="flex justify-between items-end mt-2">
            <div>
              <p className="text-sm text-muted-foreground">
                {transaction.merchant || transaction.merchantRef}
              </p>
              <p className="text-xs text-muted-foreground">
                {formatDate(transaction.date)}
              </p>
            </div>
            
            <div className="text-right">
              <p className={`font-semibold ${transaction.type === "emi" ? "" : ""}`}>
                {transaction.type === "emi" ? "-" : ""}{formatCurrency(transaction.amount)}
              </p>
              {transaction.dueDate && (
                <p className="text-xs text-muted-foreground">
                  Due on {formatDate(transaction.dueDate)}
                </p>
              )}
            </div>
          </div>
        </div>
        
        <Button variant="ghost" size="icon" className="ml-2" title="Download receipt">
          <Download className="h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
};

const EmptyState = ({ type = "transactions", search = "" }) => {
  return (
    <div className="py-10 text-center">
      <p className="text-muted-foreground">
        {search 
          ? `No ${type} found for "${search}"`
          : `No ${type} to display`}
      </p>
    </div>
  );
};

export default HistoryPage;
