export type ApplicationStates = 'BOOT' | 'LOGIN' | 'LOADED';
export interface Auth {
  baseUrl: string;
  isAuthenticated?: boolean;
  jwt?: string;
  refresh?: string;
}
