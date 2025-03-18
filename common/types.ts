export type IdType = string;

// Repositories
export interface User {
  id: IdType;
}

export interface GameState {
  started: boolean;
}

export interface Error {
  error: string;
  errorDetails?: {
    message: string;
    path: Array<string | number>;
    type: string;
  }[];
}
