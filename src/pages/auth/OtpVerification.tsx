
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

const OtpVerification = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [timeLeft, setTimeLeft] = useState(30);
  const [isResendDisabled, setIsResendDisabled] = useState(true);

  // Timer for OTP resend
  useEffect(() => {
    if (timeLeft <= 0) {
      setIsResendDisabled(false);
      return;
    }
    
    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [timeLeft]);

  const handleVerify = () => {
    if (otp.length < 4) {
      toast({
        title: "Incomplete OTP",
        description: "Please enter the complete OTP",
        variant: "destructive",
      });
      return;
    }
    
    // Demo: check if OTP is 1234
    if (otp === "1234") {
      toast({
        title: "OTP Verified",
        description: "Your mobile number has been verified",
      });
      navigate("/kyc");
    } else {
      toast({
        title: "Invalid OTP",
        description: "The OTP you entered is incorrect. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleResendOtp = () => {
    // Reset timer
    setTimeLeft(30);
    setIsResendDisabled(true);
    
    toast({
      title: "OTP Resent",
      description: "A new OTP has been sent to your mobile number",
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background p-6">
      <div className="flex-1 flex flex-col justify-center items-center">
        <div className="w-full max-w-md">
          {/* Logo and Title */}
          <div className="flex flex-col items-center mb-10">
            <img
              src="/lovable-uploads/c27b7c53-d89e-4960-898e-b094e61e9641.png"
              alt="Splitly Logo"
              className="w-20 h-20 mb-4"
            />
            <h1 className="text-3xl font-bold text-foreground">Verify Your Phone</h1>
            <p className="text-muted-foreground mt-2 text-center">
              We've sent a verification code to <br />
              <span className="font-medium text-foreground">+91 98765-43210</span>
            </p>
          </div>

          <div className="space-y-8">
            <div className="space-y-4">
              <Label htmlFor="otp" className="text-center block">
                Enter 4-digit code
              </Label>
              <div className="flex justify-center">
                <InputOTP maxLength={4} value={otp} onChange={setOtp}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                  </InputOTPGroup>
                </InputOTP>
              </div>
            </div>

            <Button
              onClick={handleVerify}
              className="w-full neon-glow"
            >
              Verify
            </Button>

            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2">
                Didn't receive the code?
              </p>
              <div className="flex justify-center items-center gap-1">
                <Button
                  variant="link"
                  onClick={handleResendOtp}
                  disabled={isResendDisabled}
                  className="text-primary p-0 h-auto"
                >
                  Resend OTP
                </Button>
                {isResendDisabled && (
                  <span className="text-sm text-muted-foreground">
                    ({timeLeft}s)
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Info text */}
      <p className="text-xs text-muted-foreground text-center mt-4">
        For this demo, the OTP is <span className="font-semibold">1234</span>
      </p>
    </div>
  );
};

export default OtpVerification;
