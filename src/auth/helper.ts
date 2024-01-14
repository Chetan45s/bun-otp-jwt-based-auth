import { jwt } from '@elysiajs/jwt';
import { Elysia, t } from 'elysia';

// JWT Access Token
// This is used to authenticate and authorize users for most API requests
export const jwtAccessToken = new Elysia({ name: 'jwtAccess' }).use(
  jwt({
    name: 'jwtAccess',
    secret: process.env.JWT_SECRET!, // Secret key for JWT signing
    schema: t.Object({
      id: t.Number(), // User ID
      exp: t.Number(), // Expiration time
    }),
    exp: '7d', // Token expires in 7 days
  }),
);

// JWT Refresh Token
// This is used to generate a new access token when the old one expires
export const jwtRefreshToken = new Elysia({ name: 'jwtRefresh' }).use(
  jwt({
    name: 'jwtRefresh',
    secret: process.env.JWT_REFRESH_SECRET!, // Secret key for JWT signing
    schema: t.Object({
      id: t.String(), // User ID
    }),
    exp: '7d', // Token expires in 7 days
  }),
);

// Function to generate OTP
// Currently, it returns a static OTP for testing purposes
export function getOtp() {
  return '123456';
}

// Function to get the current time
export function getTime() {
  const date = new Date();
  return {
    // Returns the current time in milliseconds
    ms: () => {
      return date.getTime();
    },
    // Returns the current time in ISO format
    iso: () => {
      return date.toISOString();
    },
    // Converts a given date to milliseconds
    toMs: (date2: Date) => {
      return new Date(date2).getTime();
    },
  };
}
