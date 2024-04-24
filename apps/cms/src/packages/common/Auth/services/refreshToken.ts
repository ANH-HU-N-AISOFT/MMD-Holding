export interface ResponseSuccess {
  accessToken: string;
  expiresIn: number;
}

export const endpoint = '/authentication/refreshSession';
