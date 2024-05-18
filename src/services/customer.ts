import * as customerRepo from '../repository/customer'
import {customerInputWithAddress } from '../repository/types'
import {CustomerInput, CustomerOutput} from '../models/customer'

import { addressFetch } from '../helpers/fetchAPIs';

export const create = async (payload: customerInputWithAddress): Promise<CustomerOutput> => {
    try {
        const pincodeAddress = await addressFetch(payload.address[0].pincode)
        console.log(pincodeAddress)

        payload.address.map((obj) => {
            obj.country = pincodeAddress.Country,
            obj.state = pincodeAddress.State,
            obj.district = pincodeAddress.District
            obj.postOfficeName = pincodeAddress.Name
        });

        return await customerRepo.create(payload);
    } catch(error) {
        throw error;
    }
}

export const update = async (id: number, payload: customerInputWithAddress): Promise<CustomerOutput> => {
    let pincodeAddress: any;
    if(payload.address) {
        pincodeAddress = await addressFetch(payload.address[0].pincode)
        console.log(pincodeAddress)

    }

    payload?.address.map((obj) => {
        obj.country = pincodeAddress.Country,
        obj.state = pincodeAddress.State,
        obj.district = pincodeAddress.District
        obj.postOfficeName = pincodeAddress.Name
    });

    return await customerRepo.update(id, payload)
}


export const getById = (id: number): Promise<CustomerOutput> => {
    return customerRepo.getById(id)
}

// export const deleteById = (id: number): Promise<boolean> => {
//     return customerRepo.deleteById(id)
// }
// export const getAll = (filters: GetAllcustomersFilters): Promise<customerOutput[]> => {
//     return customerRepo.getAll(filters)
// }