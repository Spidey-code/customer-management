import User from '../models/user'
import {UserInput, UserOutput} from '../models/user'
import { BadRequestError } from '../helpers/ApiError'


export const create = async (payload: UserInput): Promise<any | boolean | null> => {
        const user = await User.upsert(payload)
        return user
}

export const update = async (id: number, payload: Partial<UserInput>): Promise<UserOutput> => {
    const user = await User.findByPk(id)
    if (!user) {
        throw new BadRequestError('user not found')
    }
    const updatedUser = await (user as User).update(payload)
    return updatedUser
}

export const getById = async (id: number): Promise<UserOutput> => {
    const user = await User.findByPk(id)
    if (!user) {
        throw new BadRequestError('user not found')
    }
    return user
}

export const getByEmail = async (email: string): Promise<UserOutput | null> => {
    const user = await User.findOne({
        where: {
            email,
        }
    })
    return user?.dataValues ?? null;
}