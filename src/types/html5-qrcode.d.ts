
declare module 'html5-qrcode' {
  export interface QrDimensions {
    width: number;
    height: number;
  }

  export interface QrBox {
    width: number;
    height: number;
  }

  export interface QrScannerConfig {
    fps?: number;
    qrbox?: number | QrBox;
    aspectRatio?: number;
    disableFlip?: boolean;
    videoConstraints?: MediaTrackConstraints;
  }

  export interface CameraDevice {
    id: string;
    label: string;
  }

  export class Html5Qrcode {
    constructor(elementId: string);

    start(
      cameraIdOrConfig: string | MediaTrackConstraints,
      configuration: QrScannerConfig,
      qrCodeSuccessCallback: (decodedText: string, decodedResult: any) => void,
      qrCodeErrorCallback?: (errorMessage: string, error: any) => void
    ): Promise<void>;

    stop(): Promise<void>;
    
    clear(): void;
    
    getState(): any;
    
    isScanning: boolean;
    
    static getCameras(): Promise<CameraDevice[]>;
  }
}
