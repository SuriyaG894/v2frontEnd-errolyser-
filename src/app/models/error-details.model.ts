export interface ErrorDetails {
    id?: number;
    exceptionType: string;
    errorMessage: string;
    errorType: string;
    lineNumber: number | null;
    fileName: string;
    stackTrace: string[];
    relevantCode: string;
    timestamp?: Date;
  }