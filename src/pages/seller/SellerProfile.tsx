
import { useState } from "react";
import SellerLayout from "@/components/seller/SellerLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Edit, CheckCircle, Upload, ScanLine } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import DocumentScanner from "@/components/shared/DocumentScanner";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const SellerProfile = () => {
  const navigate = useNavigate();
  // Mock seller data
  const [seller, setSeller] = useState({
    name: "TechWorld Store",
    email: "contact@techworld.com",
    phone: "+91 9876543210",
    avatar: "https://api.dicebear.com/6.x/shapes/svg?seed=techworld",
    description: "We are a premier technology retailer specializing in the latest smartphones, laptops, and accessories. Offering quality products and excellent customer service since 2015.",
    address: "123 Tech Street, Mumbai, Maharashtra 400001",
    website: "https://techworld.example.com",
    kycStatus: "verified",
    accountCreated: "2020-05-15",
    productCount: 156,
    totalSales: "QAR34,56,789",
    rating: 4.8
  });

  const [showScanner, setShowScanner] = useState<boolean>(false);
  const [scanDocumentType, setScanDocumentType] = useState<string | null>(null);

  const handleScanComplete = (imageData: string) => {
    toast({
      title: "Document Scanned",
      description: "Your document has been successfully scanned and uploaded."
    });
    setShowScanner(false);
  };

  const handleStartKYC = () => {
    navigate("/profile/qatar-kyc");
  };

  return (
    <SellerLayout title="Seller Profile">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <h2 className="text-2xl font-bold">Your Profile</h2>
        <div className="flex gap-2">
          <Button onClick={handleStartKYC}>
            <ScanLine className="mr-2 h-4 w-4" />
            Verify KYC
          </Button>
          <Button>
            <Edit className="mr-2 h-4 w-4" />
            Edit Profile
          </Button>
        </div>
      </div>

      {/* Profile Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Main profile card */}
        <Card className="lg:col-span-2">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex flex-col items-center">
                <Avatar className="h-24 w-24 border-4 border-primary/30 mb-2">
                  <AvatarImage src={seller.avatar} />
                  <AvatarFallback>{seller.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <Button variant="outline" size="sm" className="mt-2">
                  <Upload className="mr-2 h-4 w-4" />
                  Change
                </Button>
              </div>

              <div className="flex-1 space-y-4">
                <div>
                  <h3 className="text-2xl font-bold flex items-center">
                    {seller.name}
                    {seller.kycStatus === "verified" && (
                      <Badge className="ml-2 bg-green-500 text-white">
                        <CheckCircle className="mr-1 h-3 w-3" />
                        Verified
                      </Badge>
                    )}
                  </h3>
                  <p className="text-muted-foreground">{seller.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">{seller.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p className="font-medium">{seller.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Address</p>
                    <p className="font-medium">{seller.address}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Website</p>
                    <p className="font-medium text-primary">{seller.website}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Member Since</p>
                    <p className="font-medium">{seller.accountCreated}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Seller Rating</p>
                    <p className="font-medium">{seller.rating}/5.0 ⭐</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats card */}
        <Card>
          <CardHeader>
            <CardTitle>Store Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-2 border-b border-border">
                <p className="text-muted-foreground">Total Products</p>
                <p className="font-semibold">{seller.productCount}</p>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-border">
                <p className="text-muted-foreground">Total Sales</p>
                <p className="font-semibold">{seller.totalSales}</p>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-border">
                <p className="text-muted-foreground">Store Rating</p>
                <p className="font-semibold">{seller.rating} ⭐</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-muted-foreground">KYC Status</p>
                <Badge className={seller.kycStatus === "verified" ? "bg-green-500" : "bg-yellow-500"}>
                  {seller.kycStatus.charAt(0).toUpperCase() + seller.kycStatus.slice(1)}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Store Details Form */}
      <Card>
        <CardHeader>
          <CardTitle>Store Details</CardTitle>
          <CardDescription>Manage your store information and description</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="store-name">Store Name</Label>
                <Input id="store-name" defaultValue={seller.name} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="store-email">Email Address</Label>
                <Input id="store-email" type="email" defaultValue={seller.email} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="store-phone">Phone Number</Label>
                <Input id="store-phone" defaultValue={seller.phone} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="store-website">Website</Label>
                <Input id="store-website" defaultValue={seller.website} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="store-address">Business Address</Label>
              <Input id="store-address" defaultValue={seller.address} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="store-description">Store Description</Label>
              <Textarea 
                id="store-description" 
                rows={4}
                defaultValue={seller.description} 
              />
            </div>
            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setShowScanner(true)}>
                <ScanLine className="mr-2 h-4 w-4" />
                Scan Documents
              </Button>
              <Button className="neon-glow">Save Changes</Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Document Scanner Dialog */}
      <Dialog open={showScanner} onOpenChange={setShowScanner}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Document Scanner</DialogTitle>
            <DialogDescription>
              Scan your business documents to update your profile
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-3">
              <Button 
                variant="outline" 
                className="flex flex-col h-auto p-4" 
                onClick={() => setScanDocumentType("qid-front")}
              >
                <ScanLine className="h-8 w-8 mb-2" />
                <span>QID</span>
              </Button>
              <Button 
                variant="outline" 
                className="flex flex-col h-auto p-4" 
                onClick={() => setScanDocumentType("cr-copy")}
              >
                <ScanLine className="h-8 w-8 mb-2" />
                <span>CR Copy</span>
              </Button>
              <Button 
                variant="outline" 
                className="flex flex-col h-auto p-4" 
                onClick={() => setScanDocumentType("bank-letter")}
              >
                <ScanLine className="h-8 w-8 mb-2" />
                <span>Bank Letter</span>
              </Button>
              <Button 
                variant="outline" 
                className="flex flex-col h-auto p-4" 
                onClick={() => navigate("/profile/qatar-kyc")}
              >
                <ScanLine className="h-8 w-8 mb-2" />
                <span>Full KYC</span>
              </Button>
            </div>
            
            {scanDocumentType && (
              <DocumentScanner 
                documentType={scanDocumentType as any}
                onScanComplete={handleScanComplete}
                onClose={() => setScanDocumentType(null)}
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </SellerLayout>
  );
};

export default SellerProfile;
