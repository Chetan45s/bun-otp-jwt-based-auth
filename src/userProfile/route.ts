import { Elysia } from 'elysia';
import { updateProfileSchema } from './schema';
import { getProfile, updateProfile } from './controller';
import { handleError } from '../handlers/error';
const app = new Elysia({ prefix: '/user' });

export const userProfile = app
  .onError(handleError)
  .get('/profile', getProfile)
  .patch('/profile', updateProfile, updateProfileSchema);
