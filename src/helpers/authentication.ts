import express from 'express';
import asyncHandler from '../helpers/asyncHandler';
import JWT from './JWT';
import { AccessTokenError, AuthFailureError, TokenExpiredError } from './ApiError';
import { ProtectedRequest } from '../repository/types';
import * as userRepo from '../repository/user'


const router = express.Router();

export default router.use(
  asyncHandler(async (req: ProtectedRequest | any, res, next) => {
    req.accessToken = getAccessToken(req.headers.authorization); // Express headers are auto converted to lowercase
    try {
      const payload = await JWT.validate(req.accessToken);
      const user = await userRepo.getByEmail(payload.sub);
      if (!user) throw new AuthFailureError('User not registered');
      if(user.token !== req.accessToken) throw new AuthFailureError('Invalid Token');
      req.user = user;

      return next();
    } catch (e: any) {
      if (e instanceof TokenExpiredError) throw new AccessTokenError(e.message);
      throw e;
    }
  }),
);

const getAccessToken = (authorization?: string) => {
  if (!authorization) throw new AuthFailureError('Invalid Authorization');
  if (!authorization.startsWith('Bearer '))
    throw new AuthFailureError('Invalid Authorization');
  return authorization.split(' ')[1];
};
