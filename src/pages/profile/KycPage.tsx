
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronLeft, Upload, Check, Camera } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const KycPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [idType, setIdType] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [idFront, setIdFront] = useState<string | null>(null);
  const [idBack, setIdBack] = useState<string | null>(null);
  const [selfie, setSelfie] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = () => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "KYC Submitted Successfully",
        description: "Your KYC application is being processed. We'll notify you once it's verified.",
      });
      navigate("/profile");
    }, 2000);
  };
  
  // Simulate document upload
  const handleUpload = (type: "front" | "back" | "selfie") => {
    // In a real app, this would open a file picker or camera
    const mockImageUrl = "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&q=80&w=200";
    
    setTimeout(() => {
      if (type === "front") setIdFront(mockImageUrl);
      else if (type === "back") setIdBack(mockImageUrl);
      else if (type === "selfie") setSelfie(mockImageUrl);
      
      toast({
        title: "Document Uploaded",
        description: type === "selfie" ? "Selfie captured successfully" : "Document uploaded successfully",
      });
    }, 1000);
  };
  
  return (
    <Layout title="KYC Verification">
      <div className="p-4 pb-20 md:p-6 space-y-6">
        <Button variant="ghost" onClick={() => navigate(-1)}>
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to Profile
        </Button>
        
        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle>Identity Verification</CardTitle>
              <CardDescription>
                Please provide your identity document details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="id-type">ID Document Type</Label>
                <Select value={idType} onValueChange={setIdType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select ID type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="aadhaar">Aadhaar Card</SelectItem>
                    <SelectItem value="pan">PAN Card</SelectItem>
                    <SelectItem value="dl">Driving License</SelectItem>
                    <SelectItem value="passport">Passport</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="id-number">ID Number</Label>
                <Input 
                  id="id-number" 
                  placeholder="Enter your ID number"
                  value={idNumber}
                  onChange={(e) => setIdNumber(e.target.value)}
                />
              </div>
              
              {/* Document Upload */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Upload Front Side</Label>
                  <div 
                    className={`border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-muted transition-colors
                      ${idFront ? "border-primary/50" : "border-border"}`}
                    onClick={() => handleUpload("front")}
                  >
                    {idFront ? (
                      <div className="flex items-center">
                        <Check className="h-5 w-5 text-primary mr-2" />
                        <span className="text-sm text-primary">Uploaded</span>
                      </div>
                    ) : (
                      <>
                        <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                        <span className="text-sm text-muted-foreground">Click to upload</span>
                      </>
                    )}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Upload Back Side</Label>
                  <div 
                    className={`border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-muted transition-colors
                      ${idBack ? "border-primary/50" : "border-border"}`}
                    onClick={() => handleUpload("back")}
                  >
                    {idBack ? (
                      <div className="flex items-center">
                        <Check className="h-5 w-5 text-primary mr-2" />
                        <span className="text-sm text-primary">Uploaded</span>
                      </div>
                    ) : (
                      <>
                        <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                        <span className="text-sm text-muted-foreground">Click to upload</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full neon-glow" 
                onClick={() => setStep(2)}
                disabled={!idType || !idNumber || !idFront || !idBack}
              >
                Continue
              </Button>
            </CardFooter>
          </Card>
        )}
        
        {step === 2 && (
          <Card>
            <CardHeader>
              <CardTitle>Take a Selfie</CardTitle>
              <CardDescription>
                Please take a clear selfie for identity verification
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div 
                className={`border-2 border-dashed rounded-md p-12 flex flex-col items-center justify-center cursor-pointer hover:bg-muted transition-colors
                  ${selfie ? "border-primary/50" : "border-border"}`}
                onClick={() => handleUpload("selfie")}
              >
                {selfie ? (
                  <div className="text-center space-y-2">
                    <div className="flex items-center justify-center">
                      <Check className="h-10 w-10 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-primary">Selfie Captured</h3>
                      <p className="text-sm text-muted-foreground">You look great!</p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center space-y-2">
                    <div className="flex items-center justify-center">
                      <Camera className="h-16 w-16 text-muted-foreground" />
                    </div>
                    <div>
                      <h3 className="font-medium">Take a Selfie</h3>
                      <p className="text-sm text-muted-foreground">Ensure proper lighting and face is clearly visible</p>
                    </div>
                  </div>
                )}
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Tips for a good selfie:</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>Make sure your face is clearly visible</li>
                  <li>Avoid wearing hats, sunglasses or masks</li>
                  <li>Use good lighting</li>
                  <li>Look directly at the camera</li>
                </ul>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-2">
              <Button 
                className="w-full neon-glow" 
                onClick={handleSubmit}
                disabled={!selfie || isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit KYC"}
              </Button>
              <Button 
                variant="ghost" 
                onClick={() => setStep(1)}
              >
                Go Back
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default KycPage;
