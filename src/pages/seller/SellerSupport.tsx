
import SellerLayout from "@/components/seller/SellerLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, Phone, Mail, HelpCircle } from "lucide-react";

const SellerSupport = () => {
  // Mock FAQs
  const faqs = [
    {
      question: "How do I add new products to my store?",
      answer: "To add new products, navigate to the Products section and click on 'Add New Product'. Fill in the product details, upload images, set pricing, and click 'Save'."
    },
    {
      question: "When will I receive my payout?",
      answer: "Payments are processed every Monday. The funds will typically appear in your account within 2-3 business days after processing, depending on your bank."
    },
    {
      question: "How do I handle customer returns?",
      answer: "To process a return, go to the Orders section, find the specific order, and click 'Process Return'. You can either issue a full refund or offer a replacement depending on your return policy."
    },
    {
      question: "Can I offer EMI options on specific products only?",
      answer: "Yes, you can enable/disable Splitly EMI options on a per-product basis. When adding or editing a product, look for the 'EMI Eligibility' toggle."
    },
    {
      question: "How are Splitly's fees calculated?",
      answer: "Splitly charges a 3% fee on all transactions. For EMI transactions, there's an additional 1% fee. These fees are automatically deducted from your payouts."
    }
  ];

  return (
    <SellerLayout title="Help & Support">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <h2 className="text-2xl font-bold">Help & Support</h2>
      </div>

      <Tabs defaultValue="faqs" className="mb-6">
        <TabsList className="grid grid-cols-3 w-full md:w-[400px]">
          <TabsTrigger value="faqs">FAQs</TabsTrigger>
          <TabsTrigger value="contact">Contact Us</TabsTrigger>
          <TabsTrigger value="tickets">My Tickets</TabsTrigger>
        </TabsList>
        
        {/* FAQs Tab */}
        <TabsContent value="faqs">
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription>Find quick answers to common questions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="p-4 border rounded-lg border-border">
                  <h3 className="font-semibold text-lg mb-2 flex items-center">
                    <HelpCircle className="mr-2 h-5 w-5 text-primary" />
                    {faq.question}
                  </h3>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </div>
              ))}
            </CardContent>
            <CardFooter className="flex justify-center border-t border-border pt-4">
              <p className="text-muted-foreground">
                Can't find what you're looking for?{" "}
                <Button variant="link" className="p-0 h-auto font-semibold text-primary">
                  Contact Support
                </Button>
              </p>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Contact Us Tab */}
        <TabsContent value="contact">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="neon-glow">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <MessageSquare className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Live Chat</h3>
                <p className="text-muted-foreground mb-4">Chat with our support team instantly</p>
                <Button>Start Chat</Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Call Support</h3>
                <p className="text-muted-foreground mb-4">Call our dedicated seller support line</p>
                <Button variant="outline">+91 1800-XXX-XXXX</Button>
                <p className="text-sm text-muted-foreground mt-2">Mon-Fri, 9AM-5PM</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Email Support</h3>
                <p className="text-muted-foreground mb-4">Send us an email with your query</p>
                <Button variant="outline">sellers@splitly.com</Button>
                <p className="text-sm text-muted-foreground mt-2">24-48hr response time</p>
              </CardContent>
            </Card>
          </div>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Submit a Support Ticket</CardTitle>
              <CardDescription>Our team will get back to you within 24 hours</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Input placeholder="Subject" />
                  </div>
                  <div className="space-y-2">
                    <Input placeholder="Order ID (if applicable)" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Textarea placeholder="Describe your issue in detail" rows={5} />
                </div>
                <div className="flex justify-end">
                  <Button className="neon-glow">Submit Ticket</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* My Tickets Tab */}
        <TabsContent value="tickets">
          <Card>
            <CardHeader>
              <CardTitle>Your Support Tickets</CardTitle>
              <CardDescription>Track and manage your support requests</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <HelpCircle className="mx-auto h-12 w-12 text-muted-foreground mb-2" />
                <h3 className="text-lg font-medium mb-2">No support tickets yet</h3>
                <p className="text-muted-foreground">
                  When you submit a support ticket, it will appear here.
                </p>
                <Button className="mt-4">Create a Ticket</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </SellerLayout>
  );
};

export default SellerSupport;
