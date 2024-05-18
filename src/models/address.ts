import { DataTypes, Model, Optional } from 'sequelize'
import sequelizeConnection from '../db/config';
import Customer from './customer';

interface AddressAttributes {
  id: number;
  address: string;
  landmark: number;
  pincode: number;
  customerId?: number;
  postOfficeName?: string;
  district?: string;
  state?: string;
  country?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
export interface AddressInput extends Optional<AddressAttributes, 'id'> {}
export interface AddressOutput extends Optional<AddressAttributes, 'createdAt'> {}


class Address extends Model<AddressAttributes, AddressInput> implements AddressAttributes {
    public id!: number
    public address!: string;
    public landmark!: number;
    public pincode!: number;
    public customerId?: number;
    public postOfficeName!: string
    public district!: string
    public state!: string
    public country!: string
  
    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
  }
  
  Address.init({
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    landmark: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    postOfficeName: {
      type: DataTypes.STRING,
        allowNull: true,
    },
    district: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    pincode: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    customerId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'customers',
        key: 'id'
      }
    }
  }, {
    timestamps: true,
    sequelize: sequelizeConnection,
    paranoid: true
  })

  // Customer.hasMany(Address, {
    
  // });
  // Address.belongsTo(Customer);
  

  export default Address