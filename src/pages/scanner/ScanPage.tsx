
import React, { useState } from "react";
import Layout from "@/components/Layout";
import QrScanner from "@/components/shared/QrScanner";
import { toast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Scan } from "lucide-react";

const ScanPage: React.FC = () => {
  const [scannedResult, setScannedResult] = useState<string | null>(null);

  const handleScanSuccess = (decodedText: string) => {
    setScannedResult(decodedText);
    toast({
      title: "QR Code Scanned",
      description: "Processing payment information...",
    });
  };

  return (
    <Layout title="Scan QR Code">
      <div className="container mx-auto px-4 py-6 space-y-6">
        <h1 className="text-2xl font-bold mb-4">Scan QR Code</h1>
        
        <Card className="bg-card/50">
          <CardContent className="p-6">
            <QrScanner onScanSuccess={handleScanSuccess} />
            
            {scannedResult && (
              <Alert className="mt-4">
                <Scan className="h-4 w-4" />
                <AlertDescription>
                  <div className="mt-2">
                    <p className="font-medium">Scanned content:</p>
                    <p className="break-all text-sm">{scannedResult}</p>
                  </div>
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default ScanPage;
