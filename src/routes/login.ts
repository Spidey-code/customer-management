import express from 'express';
import { SuccessResponse } from '../helpers/ApiResponse';
import * as userService from '../services/user'

import asyncHandler from '../helpers/asyncHandler';
import validator from '../helpers/validator';
import schema from '../helpers/schema';

const router = express.Router();


//for login
router.post(
  '/',
  validator(schema.signup),
  asyncHandler(async (req, res) => {
      const userRes = await userService.login(req.body.email, req.body.password)
    new SuccessResponse('Signin Successful', { ...userRes }).send(res);
  }),
);

export default router;
