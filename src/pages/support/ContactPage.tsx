
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronLeft, Mail, Phone, MapPin, Send, MessageCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const ContactPage = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [issueType, setIssueType] = useState("");
  const [message, setMessage] = useState("");

  // Contact form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      
      // Reset form
      setName("");
      setEmail("");
      setPhone("");
      setIssueType("");
      setMessage("");
      
      toast({
        title: "Message Sent Successfully",
        description: "We'll get back to you as soon as possible.",
      });
    }, 1500);
  };
  
  // Contact details
  const contactDetails = [
    {
      icon: <Phone className="h-5 w-5 text-primary" />,
      title: "Phone Support",
      description: "Get immediate assistance over the phone",
      value: "+91 1800-123-4567",
      action: {
        label: "Call Now",
        href: "tel:+911800123456"
      },
      hours: "Available: Monday-Saturday, 9 AM - 9 PM"
    },
    {
      icon: <Mail className="h-5 w-5 text-primary" />,
      title: "Email Support",
      description: "Send us an email and we'll respond within 24 hours",
      value: "support@splitly.com",
      action: {
        label: "Email Us",
        href: "mailto:support@splitly.com"
      },
      hours: "Response within 24 hours"
    },
    {
      icon: <MessageCircle className="h-5 w-5 text-primary" />,
      title: "Live Chat",
      description: "Chat with our support team in real-time",
      value: "Available on the app",
      action: {
        label: "Start Chat",
        onClick: () => navigate("/support?tab=chat")
      },
      hours: "Available: 24/7"
    }
  ];
  
  // Office address
  const officeAddress = {
    name: "Splitly Headquarters",
    address: "123 Financial District, Bandra Kurla Complex, Mumbai, Maharashtra 400051, India",
    email: "corporate@splitly.com",
    phone: "+91 22-6789-1234"
  };

  return (
    <Layout title="Contact Us">
      <div className="p-4 pb-20 md:p-6 space-y-6">
        <Button variant="ghost" onClick={() => navigate(-1)}>
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        
        {/* Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {contactDetails.map((contact, index) => (
            <Card key={index}>
              <CardContent className="p-6 flex flex-col h-full">
                <div className="flex items-center mb-4">
                  <div className="p-2 rounded-full bg-primary/10 mr-3">
                    {contact.icon}
                  </div>
                  <h3 className="font-medium">{contact.title}</h3>
                </div>
                
                <p className="text-sm text-muted-foreground mb-2">{contact.description}</p>
                <p className="font-medium mb-1">{contact.value}</p>
                <p className="text-xs text-muted-foreground mb-4">{contact.hours}</p>
                
                <div className="mt-auto">
                  {contact.action.href ? (
                    <a href={contact.action.href}>
                      <Button variant="outline" className="w-full">
                        {contact.action.label}
                      </Button>
                    </a>
                  ) : (
                    <Button variant="outline" className="w-full" onClick={contact.action.onClick}>
                      {contact.action.label}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Contact Form */}
        <Card>
          <CardHeader>
            <CardTitle>Send Us a Message</CardTitle>
            <CardDescription>
              Fill out the form below and we'll get back to you as soon as possible
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    id="name" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input 
                    id="email" 
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input 
                    id="phone" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter your phone number"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="issue-type">Issue Type</Label>
                  <Select value={issueType} onValueChange={setIssueType} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select issue type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="account">Account Issues</SelectItem>
                      <SelectItem value="payment">Payment Problems</SelectItem>
                      <SelectItem value="emi">EMI Queries</SelectItem>
                      <SelectItem value="kyc">KYC Verification</SelectItem>
                      <SelectItem value="technical">Technical Support</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea 
                  id="message" 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Please describe your issue in detail"
                  rows={5}
                  required
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full neon-glow"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>Sending...</>
                ) : (
                  <>
                    Send Message
                    <Send className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
        
        {/* Office Address */}
        <Card>
          <CardHeader>
            <CardTitle>Visit Us</CardTitle>
            <CardDescription>Our office location and contact details</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex items-start space-x-3">
              <MapPin className="h-5 w-5 text-primary mt-1" />
              <div>
                <h3 className="font-medium mb-1">{officeAddress.name}</h3>
                <p className="text-muted-foreground">{officeAddress.address}</p>
                <div className="mt-3 space-y-1">
                  <p className="text-sm">
                    <span className="text-muted-foreground">Email: </span>
                    <a href={`mailto:${officeAddress.email}`} className="text-primary">
                      {officeAddress.email}
                    </a>
                  </p>
                  <p className="text-sm">
                    <span className="text-muted-foreground">Phone: </span>
                    <a href={`tel:${officeAddress.phone}`} className="text-primary">
                      {officeAddress.phone}
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default ContactPage;
