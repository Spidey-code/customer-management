import { DataTypes, Model, Optional } from 'sequelize'
import sequelizeConnection from '../db/config';
import Address from './address';

interface CustomerAttributes {
  id: number;
  fullName: string;
  mobileNo: number;
  dob: Date;
  gender: string;
  userId: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
export interface CustomerInput extends Optional<CustomerAttributes, 'id'> {}
export interface CustomerOutput extends Optional<CustomerAttributes, 'createdAt'> {}


class Customer extends Model<CustomerAttributes, CustomerInput> implements CustomerAttributes {
    public id!: number
    public fullName!: string;
    public mobileNo!: number;
    public dob!: Date;
    public gender!: string;
    public userId!: string;
  
    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
  }
  
  Customer.init({
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    mobileNo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    dob: {
        type: DataTypes.DATE,
        allowNull: false
    },
    gender: {
        type: DataTypes.ENUM("MALE", "FEMALE"),
        allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    }
  }, {
    timestamps: true,
    sequelize: sequelizeConnection,
    paranoid: true
  })



  export default Customer