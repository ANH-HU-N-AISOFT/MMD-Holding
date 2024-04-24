export interface ResponseSuccess {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  refreshExpiresIn: number;
}

export const endpoint = '/authentication/createSession';
