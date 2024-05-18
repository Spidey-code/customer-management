import Address from '../models/address'
import Customer from '../models/customer'
import User from '../models/user'

const dbInit = () => {
  // User.sync({ alter: true }),
  Customer.sync({ alter: true })
  Address.sync({ alter: true })
}
export default dbInit 