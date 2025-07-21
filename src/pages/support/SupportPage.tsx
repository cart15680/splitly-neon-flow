
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, MessageCircle, HeadphonesIcon, HelpCircle, ChevronRight, ArrowRight, Mail, Phone } from "lucide-react";

const SupportPage = () => {
  // Common support topics
  const supportTopics = [
    {
      id: "account",
      title: "Account Issues",
      icon: <UserCircleIcon className="h-8 w-8 text-primary" />,
      description: "Help with login, registration, and account management"
    },
    {
      id: "payments",
      title: "Payments & EMIs",
      icon: <CreditCardIcon className="h-8 w-8 text-primary" />,
      description: "Issues with payments, EMIs, or refunds"
    },
    {
      id: "kyc",
      title: "KYC & Verification",
      icon: <ClipboardCheckIcon className="h-8 w-8 text-primary" />,
      description: "Help with identity verification and KYC process"
    },
    {
      id: "orders",
      title: "Orders & Products",
      icon: <ShoppingBagIcon className="h-8 w-8 text-primary" />,
      description: "Questions about your orders or product availability"
    }
  ];
  
  // Quick help articles
  const helpArticles = [
    {
      title: "How does BNPL work?",
      link: "/faqs#bnpl"
    },
    {
      title: "What happens if I miss an EMI payment?",
      link: "/faqs#missed-payment"
    },
    // Credit limit support link removed
    {
      title: "How to complete my KYC verification?",
      link: "/faqs#kyc-guide"
    },
    {
      title: "How to report a transaction issue?",
      link: "/faqs#report-issue"
    }
  ];

  return (
    <Layout title="Support">
      <div className="p-4 pb-20 md:p-6 space-y-6">
        {/* Search bar */}
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search for help..."
            className="pl-10"
          />
        </div>
        
        {/* Tabs */}
        <Tabs defaultValue="help" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="help">
              <HelpCircle className="mr-2 h-4 w-4" />
              Help
            </TabsTrigger>
            <TabsTrigger value="chat">
              <MessageCircle className="mr-2 h-4 w-4" />
              Chat
            </TabsTrigger>
            <TabsTrigger value="contact">
              <HeadphonesIcon className="mr-2 h-4 w-4" />
              Contact
            </TabsTrigger>
          </TabsList>
          
          {/* Help Content */}
          <TabsContent value="help" className="space-y-4">
            {/* Common Topics */}
            <div>
              <h2 className="text-lg font-semibold mb-3">Common Topics</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {supportTopics.map((topic) => (
                  <Card key={topic.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start">
                        <div className="mr-4">
                          {topic.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium">{topic.title}</h3>
                          <p className="text-sm text-muted-foreground">{topic.description}</p>
                        </div>
                        <ChevronRight className="h-5 w-5 text-muted-foreground" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
            
            {/* Quick Help Articles */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-lg font-semibold">Quick Help Articles</h2>
                <Link to="/faqs" className="text-primary text-sm flex items-center">
                  All FAQs
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
              
              <div className="space-y-2">
                {helpArticles.map((article, index) => (
                  <Link key={index} to={article.link}>
                    <div className="flex items-center justify-between p-3 rounded-lg hover:bg-muted transition-colors">
                      <div className="flex items-center">
                        <HelpCircle className="mr-3 h-4 w-4 text-muted-foreground" />
                        <span>{article.title}</span>
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            
            <Link to="/faqs">
              <Button className="w-full">
                Browse All FAQs
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </TabsContent>
          
          {/* Chat Content */}
          <TabsContent value="chat">
            <Card>
              <CardContent className="p-6 flex flex-col items-center justify-center text-center h-[400px]">
                <MessageCircle className="h-16 w-16 text-muted-foreground mb-6" />
                <h3 className="text-xl font-semibold mb-2">Chat with Support</h3>
                <p className="text-muted-foreground mb-6 max-w-md">
                  Connect with our customer support team for immediate assistance with your account or transactions
                </p>
                <Button className="neon-glow">
                  Start New Chat
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Contact Content */}
          <TabsContent value="contact" className="space-y-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-start">
                  <div className="p-2 rounded-full bg-primary/10 mr-4">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Email Support</h3>
                    <p className="text-sm text-muted-foreground">support@splitly.com</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Response time: Within 24 hours
                    </p>
                  </div>
                  <Link to="mailto:support@splitly.com" className="ml-auto">
                    <Button variant="outline" size="sm">
                      Email Us
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-start">
                  <div className="p-2 rounded-full bg-primary/10 mr-4">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Phone Support</h3>
                    <p className="text-sm text-muted-foreground">+91 1800-123-4567</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Available: Mon-Sat, 9 AM - 9 PM
                    </p>
                  </div>
                  <Link to="tel:+911800123456" className="ml-auto">
                    <Button variant="outline" size="sm">
                      Call Us
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
            
            <div>
              <Link to="/contact">
                <Button className="w-full">
                  View All Contact Options
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

// Custom icons
const UserCircleIcon = (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    {...props}
  >
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="10" r="3" />
    <path d="M7 20.662V19c0-1.105.895-2 2-2h6c1.105 0 2 .895 2 2v1.662" />
  </svg>
);

const CreditCardIcon = (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    {...props}
  >
    <rect width="20" height="14" x="2" y="5" rx="2" />
    <line x1="2" x2="22" y1="10" y2="10" />
  </svg>
);

const ClipboardCheckIcon = (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    {...props}
  >
    <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    <path d="m9 14 2 2 4-4" />
  </svg>
);

const ShoppingBagIcon = (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    {...props}
  >
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
    <path d="M3 6h18" />
    <path d="M16 10a4 4 0 0 1-8 0" />
  </svg>
);

export default SupportPage;
