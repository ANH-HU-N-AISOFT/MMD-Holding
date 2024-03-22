export interface Session {
  token: {
    accessToken: string;
    refreshToken: string;
  };
  role: string;
}
