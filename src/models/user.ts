import { DataTypes, Model, Optional } from 'sequelize'
import sequelizeConnection from '../db/config';
import Customer from './customer';

interface UserAttributes {
  id: number;
  email: string;
  password: string;
  token: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
export interface UserInput extends Optional<UserAttributes, 'id' | 'password'> {}
export interface UserOutput extends Optional<UserAttributes, 'createdAt'> {}


class User extends Model<UserAttributes, UserInput> implements UserAttributes {
    public id!: number
    public email!: string
    public password!: string
    public token!: string;
  
    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
  }
  
  User.init({
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: ''
      },
      token: {
        type: DataTypes.TEXT,
        allowNull: false
      },
  }, {
    timestamps: true,
    sequelize: sequelizeConnection,
    paranoid: true
  })

  // User.hasMany(Customer, {
  //   foreignKey: 'id'
  // })

  export default User