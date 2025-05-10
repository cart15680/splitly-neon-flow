
import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScanLine, Camera, FileText, Check, AlertCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface DocumentScannerProps {
  onScanComplete: (imageData: string) => void;
  documentType: "qid-front" | "qid-back" | "cr-copy" | "bank-letter" | "selfie";
  onClose?: () => void;
}

const DocumentScanner = ({ onScanComplete, documentType, onClose }: DocumentScannerProps) => {
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const documentLabels = {
    "qid-front": "QID (Front)",
    "qid-back": "QID (Back)",
    "cr-copy": "Commercial Registration (CR)",
    "bank-letter": "Bank Letter/IBAN Document",
    "selfie": "Selfie Photo"
  };

  const activateCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: documentType === "selfie" ? "user" : "environment" }
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setCameraActive(true);
        setError(null);
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      setError("Camera access denied or not available");
      toast({
        title: "Camera Error",
        description: "Cannot access your camera. Please check permissions.",
        variant: "destructive"
      });
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setCameraActive(false);
    }
  };

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      const context = canvas.getContext('2d');
      if (context) {
        setIsProcessing(true);
        
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageData = canvas.toDataURL('image/jpeg');
        
        setCapturedImage(imageData);
        stopCamera();
        
        // Simulate document processing
        setTimeout(() => {
          setIsProcessing(false);
        }, 1500);
      }
    }
  };

  const confirmImage = () => {
    if (capturedImage) {
      onScanComplete(capturedImage);
    }
  };

  const retakeImage = () => {
    setCapturedImage(null);
    activateCamera();
  };

  // Cleanup on unmount
  React.useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  return (
    <Card className="w-full">
      <CardContent className="p-4">
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <ScanLine className="h-5 w-5 mr-2" />
              <h3 className="font-medium">Scan {documentLabels[documentType]}</h3>
            </div>
          </div>

          {error && (
            <div className="flex items-center p-3 bg-destructive/10 text-destructive rounded-md">
              <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
              <p className="text-sm">{error}</p>
            </div>
          )}

          {!cameraActive && !capturedImage ? (
            <div className="flex flex-col items-center py-8 space-y-4">
              <FileText className="h-16 w-16 text-muted-foreground" />
              <div className="text-center space-y-2">
                <p className="font-medium">Ready to scan {documentLabels[documentType]}</p>
                <p className="text-sm text-muted-foreground">
                  {documentType.includes("qid") 
                    ? "Please ensure all text is clearly visible and the document is well-lit"
                    : documentType === "selfie"
                    ? "Position your face in the center of the frame in good lighting"
                    : "Make sure all details are clearly visible and the document is well-lit"}
                </p>
              </div>
              <Button onClick={activateCamera} className="neon-glow">
                <Camera className="mr-2 h-4 w-4" />
                Start Camera
              </Button>
            </div>
          ) : (
            <>
              <div className="relative bg-black rounded-lg overflow-hidden aspect-[3/4] max-h-80 mx-auto w-full">
                {cameraActive ? (
                  <>
                    <video 
                      ref={videoRef} 
                      autoPlay
                      playsInline
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 border-2 border-dashed border-primary/50 m-4 pointer-events-none" />
                  </>
                ) : (
                  capturedImage && (
                    <div className="relative h-full w-full">
                      <img 
                        src={capturedImage} 
                        alt="Captured document" 
                        className="h-full w-full object-cover"
                      />
                      {isProcessing && (
                        <div className="absolute inset-0 bg-background/50 flex items-center justify-center">
                          <div className="text-center">
                            <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-2"></div>
                            <p className="text-sm">Processing...</p>
                          </div>
                        </div>
                      )}
                    </div>
                  )
                )}
                <canvas ref={canvasRef} className="hidden" />
              </div>

              <div className="flex gap-4 mt-4">
                {cameraActive ? (
                  <>
                    <Button variant="outline" onClick={stopCamera} className="flex-1">
                      Cancel
                    </Button>
                    <Button onClick={captureImage} className="flex-1 neon-glow">
                      <Camera className="mr-2 h-4 w-4" />
                      Capture
                    </Button>
                  </>
                ) : capturedImage && !isProcessing ? (
                  <>
                    <Button variant="outline" onClick={retakeImage} className="flex-1">
                      Retake
                    </Button>
                    <Button onClick={confirmImage} className="flex-1 neon-glow">
                      <Check className="mr-2 h-4 w-4" />
                      Confirm
                    </Button>
                  </>
                ) : null}
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default DocumentScanner;
