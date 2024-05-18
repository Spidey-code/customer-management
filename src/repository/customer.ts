import { Op } from 'sequelize'
import Customer from '../models/customer'
import {CustomerInput, CustomerOutput} from '../models/customer'
import { customerInputWithAddress } from './types'
import Address from '../models/address'
import { BadRequestError } from '../helpers/ApiError'


export const create = async (payload: customerInputWithAddress): Promise<any> => {
    const { address, ...customerData } = payload;
        const customer = await Customer.create({
            ...customerData,
        },
    )
    address.map((obj) => obj.customerId = customer.id);

    const addressRes = await Address.create( { ...address[0] } )

    return { customer , addressRes };
}

export const update = async (id: number, payload: Partial<customerInputWithAddress>): Promise<any> => {
    const customer = await Customer.findByPk(id)
    if (!customer) {
        throw new BadRequestError('Customer not found')
    }
    const updatedAddress = payload.address ? payload.address[0] : { id: 0 };
    const address = await Address.findByPk(updatedAddress.id)

    if (!address) {
        throw new BadRequestError('Address not found')
    }

    console.log({updatedAddress})
    const updatedCustomer = await (customer as Customer).update(payload);
    const updateAddress = await (address as Address).update(updatedAddress)
    return { updatedCustomer: updatedCustomer.dataValues, updateAddress: updateAddress.dataValues  };
}

export const getById = async (id: number): Promise<CustomerOutput> => {
    const customer = await Customer.findByPk(id)
    if (!customer) {
        throw new BadRequestError('Customer not found')
    }
    return customer.dataValues;
}
