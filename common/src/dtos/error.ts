export interface Error {
  error: string;
  errorDetails?: {
    message: string;
    path: Array<string | number>;
    type: string;
  }[];
}
