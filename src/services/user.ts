import * as userRepo from '../repository/user'
import {GetAllUsersFilters, changePasswordType, userResponse} from '../repository/types'
import {UserInput, UserOutput} from '../models/user'
import bcrypt from 'bcrypt';
import crypto from 'crypto';

import JWT from '../helpers/JWT';
import { AuthFailureError, NotFoundError } from '../helpers/ApiError';

export const login = async (email: string, password: string): Promise<userResponse> => {
    let user = await userRepo.getByEmail(email);

    //   creating token
      const accessTokenKey = crypto.randomBytes(64).toString('hex');
      const tokens = await JWT.createTokens(
        email,
        accessTokenKey
      );

      if (user) {
        const match = await bcrypt.compare(password, user.password);
        if (!match) throw new AuthFailureError('Incorrect Password');
        user = await userRepo.create(
          {
            email: email,
            token: tokens.accessToken
          }
        );
      } else {
        const passwordHash = await bcrypt.hash(password, 10);
  
        user = await userRepo.create(
          {
            email: email,
            password: passwordHash,
            token: tokens.accessToken
          }
        );
      }

      return {
        email: email,
        token: tokens.accessToken
      }
}

export const changePassword = async (params: changePasswordType): Promise<userResponse> => {
    let user = await userRepo.getByEmail(params.email);

    if (!user) throw new NotFoundError('User not found');

     //   creating token
     const accessTokenKey = crypto.randomBytes(64).toString('hex');
     const tokens = await JWT.createTokens(
            params.email,
            accessTokenKey
        );

      if (user) {
        const match = await bcrypt.compare(params.oldPassword, user.password);
        if (!match) throw new AuthFailureError('Incorrect Password');
        const passwordHash = await bcrypt.hash(params.newPassword, 10);
  
        user = await userRepo.create(
          {
            email: params.email,
            password: passwordHash,
            token: tokens.accessToken
          }
        );
      }

      return {
        email: params.email,
        token: tokens.accessToken
      }
}

export const update = (id: number, payload: Partial<UserInput>): Promise<UserOutput> => {
    return userRepo.update(id, payload)
}
export const getById = (id: number): Promise<UserOutput> => {
    return userRepo.getById(id)
}