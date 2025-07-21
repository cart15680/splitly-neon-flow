
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Layout from "@/components/Layout";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeft, Search } from "lucide-react";

const FaqPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  
  // Get hash from URL to open specific FAQ section
  const hash = location.hash?.substring(1);
  
  // FAQ categories
  const categories = [
    { id: "general", label: "General" },
    { id: "account", label: "Account" },
    { id: "bnpl", label: "BNPL" },
    { id: "payment", label: "Payments" },
    { id: "security", label: "Security" },
  ];
  
  // Default active tab based on hash or first category
  const defaultTab = hash && categories.some(cat => cat.id === hash) ? hash : categories[0].id;
  
  // FAQ data
  const faqs = {
    general: [
      {
        id: "what-is-splitly",
        question: "What is Splitly?",
        answer: "Splitly is a Buy Now Pay Later (BNPL) platform that lets you make purchases and split the payment into easy EMIs. You can shop at our partner merchants and pay later in fixed monthly installments with low or no interest."
      },
      {
        id: "how-splitly-works",
        question: "How does Splitly work?",
        answer: "Splitly works in a few simple steps:\n1. Create an account and complete your KYC\n2. Shop at our partner merchants\n3. Choose Splitly as your payment method and select an EMI plan\n4. Pay your EMIs on time through the app"
      },
      {
        id: "splitly-cost",
        question: "Does it cost anything to use Splitly?",
        answer: "Signing up and using the Splitly app is completely free. There are no hidden charges or annual fees. For certain EMI plans, there might be a nominal interest rate or processing fee, which will be clearly shown before you confirm your purchase."
      }
    ],
    account: [
      {
        id: "create-account",
        question: "How do I create a Splitly account?",
        answer: "To create a Splitly account:\n1. Download the Splitly app from the App Store or Google Play Store\n2. Sign up with your mobile number or email\n3. Verify your account through OTP\n4. Complete your profile information\n5. Complete KYC verification"
      },
      {
        id: "kyc-guide",
        question: "How to complete my KYC verification?",
        answer: "To complete KYC verification:\n1. Go to Profile > KYC Details\n2. Select your ID document (Aadhaar, PAN, etc.)\n3. Enter your ID number\n4. Upload clear photos of your ID (front and back)\n5. Take a selfie for verification\n6. Submit and wait for approval (usually within 24 hours)"
      },
      {
        id: "edit-profile",
        question: "Can I edit my profile information after signing up?",
        answer: "Yes, you can edit most of your profile information by going to Profile > Settings. However, some information related to KYC verification cannot be changed once verified. If you need to update critical information, please contact our customer support."
      }
    ],
    bnpl: [
      {
        id: "bnpl",
        question: "How does BNPL work?",
        answer: "Buy Now Pay Later (BNPL) allows you to make purchases and pay for them over time in installments. When you shop with Splitly, you can choose to split your payment into equal monthly installments (EMIs). Based on your chosen plan, you'll make regular payments until your purchase is paid off. This gives you financial flexibility without having to pay the full amount upfront."
      },
      // Credit limit FAQ removed
      {
        id: "eligibility",
        question: "Who is eligible for Splitly BNPL?",
        answer: "To be eligible for Splitly BNPL, you need to:\n1. Be at least 18 years old\n2. Be a resident of India with a valid address\n3. Have a valid government ID (Aadhaar, PAN, etc.)\n4. Have a bank account linked for payments\n5. Pass our credit assessment process"
      }
    ],
    payment: [
      {
        id: "payment-methods",
        question: "What payment methods are accepted for EMI payments?",
        answer: "Splitly accepts several payment methods for your EMI payments including:\n1. UPI (Google Pay, PhonePe, etc.)\n2. Debit cards\n3. Credit cards\n4. Net banking\n5. Automated bank debits (with authorization)"
      },
      {
        id: "missed-payment",
        question: "What happens if I miss an EMI payment?",
        answer: "If you miss an EMI payment, the following may happen:\n1. You will be charged a late payment fee\n2. Your credit score could be impacted\n3. For continuous defaults, your account may be suspended\n\nIf you anticipate difficulty in making a payment, please contact our support team before the due date to discuss potential solutions."
      },
      {
        id: "prepay-loan",
        question: "Can I prepay my entire loan amount?",
        answer: "Yes, you can prepay your entire loan amount at any time without any prepayment penalty. To prepay:\n1. Go to BNPL > Active Plans\n2. Select the plan you want to prepay\n3. Click on 'Pay Full Amount'\n4. Complete the payment using your preferred method"
      }
    ],
    security: [
      {
        id: "account-security",
        question: "How secure is my data with Splitly?",
        answer: "Splitly takes data security very seriously. We implement bank-level security measures including:\n1. 256-bit encryption for all data transmission\n2. Two-factor authentication for account access\n3. Compliance with RBI guidelines for data protection\n4. Regular security audits and updates\n5. Strict access controls and monitoring"
      },
      {
        id: "fraudulent-activity",
        question: "What should I do if I notice suspicious activity on my account?",
        answer: "If you notice any suspicious activity:\n1. Immediately go to Security > Log Out From All Devices\n2. Change your password\n3. Contact our support team at 1800-123-4567\n4. Report any unauthorized transactions\nWe have a zero-liability policy for reported unauthorized transactions."
      },
      {
        id: "biometric",
        question: "Can I set up biometric authentication for my account?",
        answer: "Yes, Splitly supports biometric authentication for enhanced security. To enable it:\n1. Go to Profile > Security\n2. Enable the 'Biometric Authentication' toggle\n3. Verify your identity using your device's biometric system\nThis allows you to log in and authorize transactions using your fingerprint or face recognition."
      }
    ]
  };

  // Filter FAQs based on search
  const filterFaqs = (category) => {
    if (!searchTerm) return faqs[category];
    
    return faqs[category].filter(faq => 
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };
  
  // Count total FAQs that match search
  const getTotalMatchCount = () => {
    if (!searchTerm) return 0;
    
    return Object.values(faqs).flat().filter(faq =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    ).length;
  };

  return (
    <Layout title="FAQs">
      <div className="p-4 pb-20 md:p-6 space-y-6">
        <Button variant="ghost" onClick={() => navigate(-1)}>
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search FAQs..." 
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        {/* Search results count */}
        {searchTerm && (
          <div className="text-sm text-muted-foreground">
            Found {getTotalMatchCount()} results for "{searchTerm}"
          </div>
        )}
        
        {/* FAQ Content */}
        <Tabs defaultValue={defaultTab}>
          <TabsList className="w-full overflow-x-auto flex flex-nowrap scrollbar-none">
            {categories.map(category => (
              <TabsTrigger 
                key={category.id} 
                value={category.id}
                className="whitespace-nowrap"
              >
                {category.label}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {categories.map(category => (
            <TabsContent key={category.id} value={category.id}>
              <Card>
                <CardContent className="p-6">
                  <Accordion type="single" collapsible className="w-full">
                    {filterFaqs(category.id).map((faq, index) => (
                      <AccordionItem key={faq.id} value={faq.id} id={faq.id}>
                        <AccordionTrigger className="text-left">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="whitespace-pre-line">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                    
                    {filterFaqs(category.id).length === 0 && (
                      <div className="py-8 text-center">
                        <p className="text-muted-foreground">No FAQs found matching your search</p>
                      </div>
                    )}
                  </Accordion>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
        
        {/* Not finding what you need */}
        <Card>
          <CardContent className="p-6 text-center">
            <h3 className="text-lg font-medium mb-2">Can't find what you're looking for?</h3>
            <p className="text-muted-foreground mb-4">
              Our support team is here to help with any other questions you may have
            </p>
            <Button onClick={() => navigate("/contact")} className="neon-glow">
              Contact Support
            </Button>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default FaqPage;
