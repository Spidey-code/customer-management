import { Router } from 'express'
import { SuccessResponse } from '../helpers/ApiResponse'
import asyncHandler from '../helpers/asyncHandler'
import schema from '../helpers/schema'
import validator, { ValidationSource } from '../helpers/validator';
import * as userService from '../services/user'
import * as customerService from '../services/customer'
import { GenderEnum, customerInputWithAddress, changePasswordType } from '../repository/types';
import authentication from '../helpers/authentication';
import { CustomerInput } from '../models/customer';

const usersRouter = Router();

//for JWT verification
usersRouter.use(authentication);


  usersRouter.post(
    '/changePassword',
    validator(schema.changePassword),
    asyncHandler(async (req: any, res) => {

        const params: changePasswordType = {
            email: req.user.email,
            oldPassword: req.body.oldPassword,
            newPassword: req.body.newPassword
        }

        const userRes = await userService.changePassword(params)
        new SuccessResponse('Password updated Successful', { ...userRes }).send(res);
    }),
  );

usersRouter.post('/addCustomer',
  validator(schema.createCustomer),
    asyncHandler(async (req: any, res) => {
 
    const params: customerInputWithAddress = {
      fullName: req.body.fullName,
      mobileNo: req.body.mobileNo,
      dob: req.body.dob,
      gender: GenderEnum[req.body.gender],
      userId: req.user.id,
      address: req.body.address
    }


    const userRes = await customerService.create(params)
    new SuccessResponse('Customer created Successful', { ...userRes }).send(res);
}))


usersRouter.get('/getCustomer',
  validator(schema.getCustomer, ValidationSource.QUERY),
    asyncHandler(async (req: any, res) => {
    const userRes = await customerService.getById(req.query.id)
    new SuccessResponse('Customer fetched Successful', { ...userRes }).send(res);
}))

usersRouter.get('/updateCustomer',
  validator(schema.updateCustomer, ValidationSource.BODY),
    asyncHandler(async (req: any, res) => {

      const params: customerInputWithAddress = {
        fullName: req.body.fullName,
        mobileNo: req.body.mobileNo,
        dob: req.body.dob,
        gender: GenderEnum[req.body.gender],
        userId: req.user.id,
        address: req.body.address
      }

    const userRes = await customerService.update(req.body.id, params)
    new SuccessResponse('Customer updated Successful', { ...userRes }).send(res);
}))

export default usersRouter