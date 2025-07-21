
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { ChevronLeft, Upload, Check, AlertCircle, ScanLine, Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import DocumentScanner from "@/components/shared/DocumentScanner";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

type DocumentType = "qid-front" | "qid-back" | "cr-copy" | "bank-letter" | "selfie";
type UserType = "buyer" | "seller";

const QatarKycPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [userType, setUserType] = useState<UserType>("buyer");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [qidNumber, setQidNumber] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [crNumber, setCrNumber] = useState("");
  const [vatNumber, setVatNumber] = useState("");
  const [legalStructure, setLegalStructure] = useState("");
  const [documents, setDocuments] = useState<Record<DocumentType, string | null>>({
    "qid-front": null,
    "qid-back": null,
    "cr-copy": null,
    "bank-letter": null,
    "selfie": null
  });
  const [showScanner, setShowScanner] = useState<DocumentType | null>(null);
  const [otpCode, setOtpCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);

  const handleScanComplete = (documentType: DocumentType, imageData: string) => {
    setDocuments(prev => ({
      ...prev,
      [documentType]: imageData
    }));
    setShowScanner(null);
    toast({
      title: "Document Scanned",
      description: "Your document has been successfully scanned.",
    });

    // Simulate OCR for QID documents
    if (documentType === "qid-front" && !fullName) {
      // Simulate extracting data from QID
      setTimeout(() => {
        setFullName("Mohammed Al-Thani");
        setQidNumber("28915400358");
        toast({
          title: "Data Extracted",
          description: "Personal information extracted from QID",
        });
      }, 1500);
    }
  };

  const sendOtp = () => {
    // Simulate sending OTP
    toast({
      title: "OTP Sent",
      description: `A verification code has been sent to +974 ${phoneNumber.slice(-8)}`,
    });
  };

  const verifyOtp = () => {
    if (otpCode.length !== 6) {
      toast({
        title: "Invalid OTP",
        description: "Please enter a valid 6-digit code",
        variant: "destructive"
      });
      return;
    }

    setIsVerifyingOtp(true);

    // Simulate OTP verification
    setTimeout(() => {
      setIsVerifyingOtp(false);
      // Always succeed for demo
      setStep(prev => prev + 1);
      toast({
        title: "Phone Verified",
        description: "Your phone number has been verified successfully",
      });
    }, 1500);
  };

  const handleSubmitKyc = () => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "KYC Submitted Successfully",
        description: "Your verification documents are being processed. We'll notify you once they're verified.",
      });
      navigate("/profile");
    }, 2000);
  };

  // Helper to check if current step is complete
  const isStepComplete = () => {
    switch (step) {
      case 1:
        return userType === "buyer" ? 
          (!!fullName && !!phoneNumber && !!qidNumber) : 
          (!!businessName && !!crNumber && !!legalStructure);
      case 2:
        if (userType === "buyer") {
          return !!documents["qid-front"] && !!documents["qid-back"];
        } else {
          return !!documents["qid-front"] && !!documents["qid-back"] && !!documents["cr-copy"] && !!documents["bank-letter"];
        }
      case 3:
        return userType === "buyer" ? 
          !!documents["selfie"] : true;
      case 4:
        return userType === "buyer" && otpCode.length === 6;
      default:
        return false;
    }
  };
  
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>
                {userType === "buyer" 
                  ? "Please provide your personal details for verification" 
                  : "Please provide your business details for verification"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Toggle between buyer and seller */}
              <div className="flex gap-4 p-1 bg-muted rounded-lg">
                <Button
                  type="button"
                  variant={userType === "buyer" ? "default" : "ghost"}
                  className={`flex-1 ${userType === "buyer" ? "neon-glow" : ""}`}
                  onClick={() => setUserType("buyer")}
                >
                  Individual Buyer
                </Button>
                <Button
                  type="button"
                  variant={userType === "seller" ? "default" : "ghost"}
                  className={`flex-1 ${userType === "seller" ? "neon-glow" : ""}`}
                  onClick={() => setUserType("seller")}
                >
                  Business Seller
                </Button>
              </div>

              {userType === "buyer" ? (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="full-name">Full Name</Label>
                    <Input 
                      id="full-name" 
                      placeholder="Enter your full name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone-number">Phone Number</Label>
                    <div className="flex">
                      <span className="flex items-center px-3 bg-muted border border-r-0 border-input rounded-l-md text-sm">
                        +974
                      </span>
                      <Input 
                        id="phone-number" 
                        placeholder="XXXX XXXX"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="rounded-l-none"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="qid-number">QID Number</Label>
                    <Input 
                      id="qid-number" 
                      placeholder="Enter your QID number"
                      value={qidNumber}
                      onChange={(e) => setQidNumber(e.target.value)}
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="business-name">Business Name</Label>
                    <Input 
                      id="business-name" 
                      placeholder="Enter your business name"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="cr-number">Commercial Registration Number</Label>
                    <Input 
                      id="cr-number" 
                      placeholder="Enter your CR number"
                      value={crNumber}
                      onChange={(e) => setCrNumber(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="vat-number">VAT Registration Number (Optional)</Label>
                    <Input 
                      id="vat-number" 
                      placeholder="Enter your VAT number"
                      value={vatNumber}
                      onChange={(e) => setVatNumber(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="legal-structure">Legal Structure</Label>
                    <Select value={legalStructure} onValueChange={setLegalStructure}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select legal structure" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="llc">Limited Liability Company (LLC)</SelectItem>
                        <SelectItem value="sole">Sole Proprietorship</SelectItem>
                        <SelectItem value="partnership">Partnership</SelectItem>
                        <SelectItem value="corporation">Corporation</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full neon-glow" 
                onClick={() => setStep(2)}
                disabled={!isStepComplete()}
              >
                Continue
              </Button>
            </CardFooter>
          </Card>
        );

      case 2:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Document Verification</CardTitle>
              <CardDescription>
                Please scan or upload the required documents
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {userType === "buyer" ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>QID Front Side</Label>
                      {documents["qid-front"] ? (
                        <div className="relative h-48 border rounded-md overflow-hidden group">
                          <img 
                            src={documents["qid-front"]} 
                            alt="QID Front" 
                            className="h-full w-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <Button variant="outline" onClick={() => setShowScanner("qid-front")}>
                              <ScanLine className="mr-2 h-4 w-4" />
                              Rescan
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div 
                          className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-muted transition-colors h-48"
                          onClick={() => setShowScanner("qid-front")}
                        >
                          <ScanLine className="h-8 w-8 text-muted-foreground mb-2" />
                          <span className="text-sm text-muted-foreground">Click to scan QID front</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label>QID Back Side</Label>
                      {documents["qid-back"] ? (
                        <div className="relative h-48 border rounded-md overflow-hidden group">
                          <img 
                            src={documents["qid-back"]} 
                            alt="QID Back" 
                            className="h-full w-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <Button variant="outline" onClick={() => setShowScanner("qid-back")}>
                              <ScanLine className="mr-2 h-4 w-4" />
                              Rescan
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div 
                          className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-muted transition-colors h-48"
                          onClick={() => setShowScanner("qid-back")}
                        >
                          <ScanLine className="h-8 w-8 text-muted-foreground mb-2" />
                          <span className="text-sm text-muted-foreground">Click to scan QID back</span>
                        </div>
                      )}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>QID of Business Owner</Label>
                      {documents["qid-front"] ? (
                        <div className="relative h-40 border rounded-md overflow-hidden group">
                          <img 
                            src={documents["qid-front"]} 
                            alt="QID Front" 
                            className="h-full w-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <Button variant="outline" onClick={() => setShowScanner("qid-front")}>
                              <ScanLine className="mr-2 h-4 w-4" />
                              Rescan
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div 
                          className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-muted transition-colors h-40"
                          onClick={() => setShowScanner("qid-front")}
                        >
                          <ScanLine className="h-8 w-8 text-muted-foreground mb-2" />
                          <span className="text-sm text-muted-foreground">Click to scan QID</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Commercial Registration (CR) Copy</Label>
                      {documents["cr-copy"] ? (
                        <div className="relative h-40 border rounded-md overflow-hidden group">
                          <img 
                            src={documents["cr-copy"]} 
                            alt="CR Copy" 
                            className="h-full w-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <Button variant="outline" onClick={() => setShowScanner("cr-copy")}>
                              <ScanLine className="mr-2 h-4 w-4" />
                              Rescan
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div 
                          className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-muted transition-colors h-40"
                          onClick={() => setShowScanner("cr-copy")}
                        >
                          <ScanLine className="h-8 w-8 text-muted-foreground mb-2" />
                          <span className="text-sm text-muted-foreground">Click to scan CR</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="space-y-2 md:col-span-2">
                      <Label>Bank Letter or IBAN Document</Label>
                      {documents["bank-letter"] ? (
                        <div className="relative h-40 border rounded-md overflow-hidden group">
                          <img 
                            src={documents["bank-letter"]} 
                            alt="Bank Letter" 
                            className="h-full w-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <Button variant="outline" onClick={() => setShowScanner("bank-letter")}>
                              <ScanLine className="mr-2 h-4 w-4" />
                              Rescan
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div 
                          className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-muted transition-colors h-40"
                          onClick={() => setShowScanner("bank-letter")}
                        >
                          <ScanLine className="h-8 w-8 text-muted-foreground mb-2" />
                          <span className="text-sm text-muted-foreground">Click to scan bank document</span>
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}
              {showScanner && (
                <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                  <div className="max-w-md w-full">
                    <DocumentScanner 
                      documentType={showScanner} 
                      onScanComplete={(imageData) => handleScanComplete(showScanner, imageData)}
                      onClose={() => setShowScanner(null)}
                    />
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex flex-col space-y-2">
              <Button 
                className="w-full neon-glow" 
                onClick={() => setStep(userType === "buyer" ? 3 : 5)}
                disabled={!isStepComplete()}
              >
                Continue
              </Button>
              <Button 
                variant="ghost" 
                onClick={() => setStep(1)}
              >
                Go Back
              </Button>
            </CardFooter>
          </Card>
        );

      case 3: // Selfie verification for buyer
        return (
          <Card>
            <CardHeader>
              <CardTitle>Face Verification</CardTitle>
              <CardDescription>
                Please take a clear selfie for identity verification
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {documents["selfie"] ? (
                <div className="relative h-64 border rounded-md overflow-hidden">
                  <img 
                    src={documents["selfie"]} 
                    alt="Selfie" 
                    className="h-full w-full object-cover"
                  />
                  <Button 
                    variant="outline" 
                    className="absolute bottom-4 right-4"
                    onClick={() => setShowScanner("selfie")}
                  >
                    <ScanLine className="mr-2 h-4 w-4" />
                    Retake
                  </Button>
                </div>
              ) : (
                <div 
                  className="border-2 border-dashed rounded-md p-12 flex flex-col items-center justify-center cursor-pointer hover:bg-muted transition-colors h-64"
                  onClick={() => setShowScanner("selfie")}
                >
                  <ScanLine className="h-12 w-12 text-muted-foreground mb-3" />
                  <div className="text-center">
                    <h3 className="font-medium mb-1">Take a Selfie</h3>
                    <p className="text-sm text-muted-foreground">Ensure proper lighting and that your face is clearly visible</p>
                  </div>
                </div>
              )}
              
              {showScanner === "selfie" && (
                <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                  <div className="max-w-md w-full">
                    <DocumentScanner 
                      documentType="selfie" 
                      onScanComplete={(imageData) => handleScanComplete("selfie", imageData)}
                      onClose={() => setShowScanner(null)}
                    />
                  </div>
                </div>
              )}
              
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
                onClick={() => setStep(4)}
                disabled={!isStepComplete()}
              >
                Continue
              </Button>
              <Button 
                variant="ghost" 
                onClick={() => setStep(2)}
              >
                Go Back
              </Button>
            </CardFooter>
          </Card>
        );

      case 4: // OTP verification for buyer
        return (
          <Card>
            <CardHeader>
              <CardTitle>Phone Verification</CardTitle>
              <CardDescription>
                Enter the 6-digit code sent to +974 {phoneNumber.slice(-8)}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col items-center">
                <div className="my-6">
                  <InputOTP maxLength={6} value={otpCode} onChange={setOtpCode}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
                
                <Button 
                  variant="link" 
                  onClick={sendOtp}
                  className="text-sm"
                >
                  Didn't receive a code? Resend
                </Button>
              </div>
              
              <div className="p-3 bg-muted/30 text-muted-foreground rounded-md flex items-start">
                <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                <p className="text-sm">For this demo, any 6-digit code will work. In a real application, we would verify the code with your telecom provider.</p>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-2">
              <Button 
                className="w-full neon-glow" 
                onClick={verifyOtp}
                disabled={!isStepComplete() || isVerifyingOtp}
              >
                {isVerifyingOtp ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  "Verify OTP"
                )}
              </Button>
              <Button 
                variant="ghost" 
                onClick={() => setStep(3)}
              >
                Go Back
              </Button>
            </CardFooter>
          </Card>
        );

      case 5: // Final step
        return (
          <Card>
            <CardHeader>
              <CardTitle>Verification Complete</CardTitle>
              <CardDescription>
                Your information has been successfully submitted for verification
              </CardDescription>
            </CardHeader>
            <CardContent className="py-6">
              <div className="flex flex-col items-center justify-center text-center space-y-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Check className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Thank You!</h3>
                <p className="text-muted-foreground">
                  {userType === "buyer" 
                    ? "Your identity verification is now complete. You can start using our BNPL services."
                    : "Your business verification is now under review. This typically takes 1-2 business days. We'll notify you once the verification is complete."}
                </p>
                
                <div className="border border-border rounded-lg p-4 w-full mt-4">
                  <h4 className="font-medium mb-2">Verification Status</h4>
                  <div className="flex items-center space-x-2">
                    {userType === "buyer" ? (
                      <>
                        <span className="flex h-2 w-2 rounded-full bg-green-500"></span>
                        <span className="text-green-500">Verified</span>
                      </>
                    ) : (
                      <>
                        <span className="flex h-2 w-2 rounded-full bg-yellow-500"></span>
                        <span className="text-yellow-500">Under Review</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full neon-glow" 
                onClick={handleSubmitKyc}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Continue to Profile"
                )}
              </Button>
            </CardFooter>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <Layout title="KYC Verification">
      <div className="p-4 pb-20 md:p-6 space-y-6">
        <Button variant="ghost" onClick={() => navigate(-1)}>
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to Profile
        </Button>
        
        {/* Progress steps */}
        <div className="flex justify-between items-center w-full max-w-md mx-auto mb-6">
          {[1, 2, 3, 4, 5].map((s) => (
            <div key={s} className="flex flex-col items-center">
              <div 
                className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-medium
                  ${s < step ? "bg-primary/20 text-primary border border-primary" : 
                    s === step ? "bg-primary text-primary-foreground" : 
                    "bg-muted text-muted-foreground"}`}
              >
                {s < step ? <Check className="h-4 w-4" /> : s}
              </div>
              <span className="text-xs mt-1 text-muted-foreground hidden sm:inline">
                {s === 1 ? "Details" : 
                 s === 2 ? "Documents" : 
                 s === 3 ? "Selfie" :
                 s === 4 ? "Verify" : "Complete"}
              </span>
            </div>
          ))}
        </div>
        
        <div className="max-w-md mx-auto">
          {renderStep()}
        </div>
      </div>
    </Layout>
  );
};

export default QatarKycPage;
