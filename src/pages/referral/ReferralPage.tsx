
import { useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Award, Gift, Users, Copy, Share2, CheckCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const ReferralPage = () => {
  const [referralCode] = useState("SPLITLY_RAJ123");
  const [copied, setCopied] = useState(false);
  
  // Referral stats
  const referralStats = {
    totalReferrals: 12,
    pendingReferrals: 3,
    successfulReferrals: 9,
    totalEarned: 2250
  };
  
  // Referral rewards tier
  const rewardsTiers = [
    {
      count: 5,
      reward: "QAR1,000 cashback",
      description: "When your first 5 referrals sign up and complete KYC",
      completed: true
    },
    {
      count: 10,
      reward: "QAR2,500 cashback",
      description: "When 10 referrals sign up and make their first purchase",
      completed: false
    },
    {
      count: 25,
      reward: "QAR7,500 cashback",
      description: "When 25 referrals sign up and make their first purchase",
      completed: false
    }
  ];
  
  // Dummy referred friends data
  const referrals = [
    { name: "Amit Sharma", date: "May 8, 2025", status: "completed", reward: 250 },
    { name: "Priya Patel", date: "May 5, 2025", status: "completed", reward: 250 },
    { name: "Vikas Mehta", date: "May 3, 2025", status: "completed", reward: 250 },
    { name: "Neha Singh", date: "Apr 30, 2025", status: "completed", reward: 250 },
    { name: "Rahul Kumar", date: "Apr 28, 2025", status: "completed", reward: 250 },
    { name: "Ananya Gupta", date: "Apr 25, 2025", status: "completed", reward: 250 },
    { name: "Karan Kapoor", date: "Apr 20, 2025", status: "completed", reward: 250 },
    { name: "Meera Reddy", date: "Apr 15, 2025", status: "completed", reward: 250 },
    { name: "Arjun Nair", date: "Apr 10, 2025", status: "completed", reward: 250 },
    { name: "Divya Joshi", date: "May 9, 2025", status: "pending", reward: 0 },
    { name: "Sanjay Verma", date: "May 7, 2025", status: "pending", reward: 0 },
    { name: "Riya Malhotra", date: "May 2, 2025", status: "pending", reward: 0 },
  ];
  
  // Filter referrals based on status
  const filteredReferrals = (status) => {
    if (status === "all") return referrals;
    return referrals.filter(referral => referral.status === status);
  };
  
  // Copy referral code to clipboard
  const copyReferralCode = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    toast({
      title: "Referral Code Copied!",
      description: "Your referral code has been copied to clipboard",
    });
    
    // Reset copied state after 3 seconds
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };
  
  // Share referral code
  const shareReferralCode = () => {
    if (navigator.share) {
      navigator.share({
        title: "Join Splitly with my referral code!",
        text: `Use my referral code ${referralCode} and get QAR250 bonus when you sign up for Splitly!`,
        url: "https://splitly.com/referral"
      });
    } else {
      copyReferralCode();
    }
  };

  return (
    <Layout title="Refer & Earn">
      <div className="p-4 pb-20 md:p-6 space-y-6">
        {/* Referral Banner */}
        <Card className="neon-glow bg-card overflow-hidden">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-6 md:mb-0">
                <h2 className="text-xl font-bold mb-2">Invite Friends & Earn Rewards</h2>
                <p className="text-muted-foreground mb-4">
                  Both you and your friend get QAR250 when they join using your code
                </p>
                
                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                  <div className="relative">
                    <Input
                      value={referralCode}
                      readOnly
                      className="pr-12"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0"
                      onClick={copyReferralCode}
                    >
                      {copied ? <CheckCircle className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                  
                  <Button onClick={shareReferralCode}>
                    <Share2 className="mr-2 h-4 w-4" />
                    Share
                  </Button>
                </div>
              </div>
              
              <div className="flex-shrink-0 p-4">
                <div className="p-4 rounded-full bg-primary/20 text-primary">
                  <Gift className="h-12 w-12 md:h-16 md:w-16" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Referral Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <Users className="h-6 w-6 mx-auto text-primary mb-2" />
              <h3 className="text-xl font-bold">{referralStats.totalReferrals}</h3>
              <p className="text-xs text-muted-foreground">Total Referrals</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <CheckCircle className="h-6 w-6 mx-auto text-primary mb-2" />
              <h3 className="text-xl font-bold">{referralStats.successfulReferrals}</h3>
              <p className="text-xs text-muted-foreground">Successful</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <div className="h-6 w-6 mx-auto mb-2 text-primary">⏳</div>
              <h3 className="text-xl font-bold">{referralStats.pendingReferrals}</h3>
              <p className="text-xs text-muted-foreground">Pending</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <Award className="h-6 w-6 mx-auto text-primary mb-2" />
              <h3 className="text-xl font-bold">QAR{referralStats.totalEarned}</h3>
              <p className="text-xs text-muted-foreground">Total Earned</p>
            </CardContent>
          </Card>
        </div>
        
        {/* Rewards Tiers */}
        <Card>
          <CardHeader>
            <CardTitle>Rewards Tiers</CardTitle>
            <CardDescription>Unlock special rewards as you refer more friends</CardDescription>
          </CardHeader>
          <CardContent className="p-4">
            <div className="space-y-4">
              {rewardsTiers.map((tier, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border ${
                    tier.completed ? "border-primary/50 bg-primary/5" : "border-border"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        tier.completed ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"
                      }`}>
                        {tier.count}
                      </div>
                      <div className="ml-4">
                        <h3 className="font-medium">{tier.reward}</h3>
                        <p className="text-sm text-muted-foreground">{tier.description}</p>
                      </div>
                    </div>
                    
                    {tier.completed ? (
                      <CheckCircle className="h-5 w-5 text-primary" />
                    ) : (
                      <div className="text-xs rounded-full bg-muted px-3 py-1">
                        {referralStats.successfulReferrals}/{tier.count} Completed
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* Referred Friends */}
        <Card>
          <CardHeader>
            <CardTitle>Your Referrals</CardTitle>
            <CardDescription>Track the status of your referrals</CardDescription>
          </CardHeader>
          <CardContent className="p-4">
            <Tabs defaultValue="all">
              <TabsList className="grid w-full grid-cols-3 mb-4">
                <TabsTrigger value="all">All ({referrals.length})</TabsTrigger>
                <TabsTrigger value="completed">Completed ({filteredReferrals("completed").length})</TabsTrigger>
                <TabsTrigger value="pending">Pending ({filteredReferrals("pending").length})</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="space-y-4">
                {filteredReferrals("all").map((referral, index) => (
                  <ReferralItem key={index} referral={referral} />
                ))}
              </TabsContent>
              
              <TabsContent value="completed" className="space-y-4">
                {filteredReferrals("completed").length > 0 ? (
                  filteredReferrals("completed").map((referral, index) => (
                    <ReferralItem key={index} referral={referral} />
                  ))
                ) : (
                  <EmptyState message="No completed referrals yet" />
                )}
              </TabsContent>
              
              <TabsContent value="pending" className="space-y-4">
                {filteredReferrals("pending").length > 0 ? (
                  filteredReferrals("pending").map((referral, index) => (
                    <ReferralItem key={index} referral={referral} />
                  ))
                ) : (
                  <EmptyState message="No pending referrals" />
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        
        {/* How it works */}
        <Card>
          <CardHeader>
            <CardTitle>How Referrals Work</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  1
                </div>
                <div>
                  <h3 className="font-medium mb-1">Share Your Code</h3>
                  <p className="text-sm text-muted-foreground">
                    Send your unique referral code to friends and family who haven't used Splitly before
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  2
                </div>
                <div>
                  <h3 className="font-medium mb-1">They Sign Up & Complete KYC</h3>
                  <p className="text-sm text-muted-foreground">
                    Your friends need to create an account using your referral code and complete KYC verification
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  3
                </div>
                <div>
                  <h3 className="font-medium mb-1">Both Get Rewarded</h3>
                  <p className="text-sm text-muted-foreground">
                    Once your friend makes their first purchase, both of you receive QAR250 cashback
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

// ReferralItem component
const ReferralItem = ({ referral }) => {
  return (
    <div className="flex justify-between items-center p-4 rounded-lg border border-border">
      <div>
        <h3 className="font-medium">{referral.name}</h3>
        <p className="text-xs text-muted-foreground">Joined: {referral.date}</p>
      </div>
      
      <div className="flex items-center">
        {referral.status === "completed" ? (
          <div className="flex items-center">
            <span className="font-medium text-green-500 mr-2">+QAR{referral.reward}</span>
            <div className="h-6 w-6 rounded-full bg-green-500/20 flex items-center justify-center">
              <CheckCircle className="h-3 w-3 text-green-500" />
            </div>
          </div>
        ) : (
          <div className="text-xs rounded-full bg-yellow-500/20 text-yellow-500 px-3 py-1">
            Pending
          </div>
        )}
      </div>
    </div>
  );
};

// EmptyState component
const EmptyState = ({ message }) => {
  return (
    <div className="text-center py-8">
      <p className="text-muted-foreground">{message}</p>
    </div>
  );
};

export default ReferralPage;
