
import React from 'react';
import { AlertCircle, CheckCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface AIVerificationResultProps {
  isPothole: boolean;
  confidence: number;
  message: string;
  isVerifying: boolean;
}

const AIVerificationResult: React.FC<AIVerificationResultProps> = ({
  isPothole,
  confidence,
  message,
  isVerifying
}) => {
  if (isVerifying) {
    return (
      <div className="bg-gray-50 p-4 rounded-lg flex items-center gap-3">
        <svg className="animate-spin h-4 w-4 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span className="text-gray-600">AI is verifying your image...</span>
      </div>
    );
  }

  if (!isPothole) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Image Verification Failed</AlertTitle>
        <AlertDescription>
          {message}
          <div className="mt-2">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-red-500 h-2 rounded-full" 
                style={{ width: `${confidence * 100}%` }}
              ></div>
            </div>
            <div className="text-xs text-gray-500 mt-1">Confidence: {Math.round(confidence * 100)}%</div>
          </div>
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Alert variant="default" className="border-green-200 bg-green-50">
      <CheckCircle className="h-4 w-4 text-green-600" />
      <AlertTitle className="text-green-700">Image Verified</AlertTitle>
      <AlertDescription className="text-green-700">
        {message}
        <div className="mt-2">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-green-500 h-2 rounded-full" 
              style={{ width: `${confidence * 100}%` }}
            ></div>
          </div>
          <div className="text-xs text-gray-500 mt-1">Confidence: {Math.round(confidence * 100)}%</div>
        </div>
      </AlertDescription>
    </Alert>
  );
};

export default AIVerificationResult;
