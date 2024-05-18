import Joi from 'joi';

let createAddress = Joi.object().keys({
  address: Joi.string().required(),
  landmark: Joi.string().required(),
  pincode: Joi.string().length(6).pattern(/^[0-9]+$/).required(),
})

let updateAddress = Joi.object().keys({
  id: Joi.number().required(),
  address: Joi.string().required(),
  landmark: Joi.string().required(),
  pincode: Joi.string().length(6).pattern(/^[0-9]+$/).required(),
})

export default {
  signup: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
  changePassword: Joi.object().keys({
    oldPassword: Joi.string().required().min(8),
    newPassword: Joi.string().required().min(8),
  }),
  createCustomer: Joi.object().keys({
    fullName: Joi.string().required().max(32),
    mobileNo: Joi.string().length(10).pattern(/^[0-9]+$/).required(),
    dob: Joi.date(),
    gender: Joi.number().min(0).max(1),
    address: Joi.array().items(createAddress),
  }),
  getCustomer: Joi.object().keys({
    id: Joi.string().required(),
  }),
  updateCustomer: Joi.object().keys({
    id: Joi.number().required(),
    fullName: Joi.string().required().max(32),
    mobileNo: Joi.string().length(10).pattern(/^[0-9]+$/).required(),
    dob: Joi.date(),
    gender: Joi.number().min(0).max(1),
    address: Joi.array().items(updateAddress),
  }), 
};
