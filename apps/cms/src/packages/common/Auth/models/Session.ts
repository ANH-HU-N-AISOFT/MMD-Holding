export interface Session {
  token: {
    accessToken: string;
    refreshToken: string;
  };
  role: 'admin' | 'tvv' | 'sales';
}
