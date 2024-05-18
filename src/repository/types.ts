import { AddressInput } from "../models/address"
import { CustomerInput } from "../models/customer"
import User from "../models/user"

export interface GetAllUsersFilters {
    isDeleted?: boolean
    includeDeleted?: boolean
}

export type changePasswordType  = {
    oldPassword: string
    newPassword: string
    email: string
}

export type userResponse = {
    email: string
    token: string
}

export interface ProtectedRequest extends Request  {
    user: User;
    accessToken: string;
}

export enum GenderEnum {
    "MALE",
    "FEMALE"
}

export interface customerInputWithAddress extends CustomerInput {
    address: AddressInput[]
}