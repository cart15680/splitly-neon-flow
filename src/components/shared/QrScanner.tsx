
import React, { useState, useEffect } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { QrCode, Camera, X } from "lucide-react";

interface QrScannerProps {
  onScanSuccess: (decodedText: string) => void;
  onScanError?: (error: string) => void;
  onClose?: () => void;
}

const QrScanner = ({ onScanSuccess, onScanError, onClose }: QrScannerProps) => {
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scannerId = "qr-reader";

  useEffect(() => {
    let html5QrCode: Html5Qrcode;

    const initializeScanner = async () => {
      if (isScanning) {
        try {
          html5QrCode = new Html5Qrcode(scannerId);
          await html5QrCode.start(
            { facingMode: "environment" },
            {
              fps: 10,
              qrbox: { width: 250, height: 250 },
              aspectRatio: 1.0,
            },
            (decodedText) => {
              onScanSuccess(decodedText);
              html5QrCode.stop().catch(console.error);
              setIsScanning(false);
            },
            (errorMessage) => {
              console.log(errorMessage);
            }
          );
        } catch (err) {
          setError("Camera access denied or not available");
          setIsScanning(false);
          if (onScanError) {
            onScanError("Camera access denied or not available");
          }
        }
      }
    };

    initializeScanner();

    return () => {
      if (html5QrCode && html5QrCode.isScanning) {
        html5QrCode.stop().catch(console.error);
      }
    };
  }, [isScanning, onScanSuccess, onScanError]);

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <QrCode className="h-5 w-5 mr-2" />
            <h3 className="font-medium">QR Code Scanner</h3>
          </div>
          {onClose && (
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        {!isScanning ? (
          <div className="flex flex-col items-center py-6 space-y-4">
            <div className="text-center">
              <Camera className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
              <p className="mb-4">Scan QR codes for quick access to products, orders, or verification</p>
            </div>
            <Button onClick={() => setIsScanning(true)} className="neon-glow">
              <Camera className="mr-2 h-4 w-4" />
              Start Scanning
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div
              id={scannerId}
              className="w-full h-64 mx-auto overflow-hidden rounded-md bg-muted"
            ></div>
            {error && <p className="text-destructive text-sm">{error}</p>}
            <Button
              variant="outline"
              onClick={() => setIsScanning(false)}
              className="w-full"
            >
              Cancel
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default QrScanner;
