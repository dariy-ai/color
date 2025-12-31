// Type definitions for the Color app

export interface Photo {
  path: string;
  width: number;
  height: number;
}

export interface AnalysisResult {
  text: string;
  timestamp: number;
  photoPath: string;
}

export interface CameraPermissionStatus {
  granted: boolean;
  canAskAgain: boolean;
}
