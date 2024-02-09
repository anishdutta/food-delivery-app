import { ICreateUserRequest, IUser, IUserIdentifier, IUserRoles } from "./user.interfaces";
import { ObjectId } from "mongodb";

import { Sequelize, DataTypes, Model, CreationOptional, Optional, where } from "sequelize";
import { sequelize } from "../../config/sequelize.config";
import bcrypt from 'bcryptjs';

class UserDb extends Model<IUser> {
  // id can be undefined during creation when using `autoIncrement`
  declare id: CreationOptional<number>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare name: string;
  declare email: string;
  declare username: string;
  declare phoneNumber: string;
  declare role: IUserRoles;
  declare password: string;
  declare isVerified: CreationOptional<boolean>;
}

UserDb.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    username: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    phoneNumber: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },

    role: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
  },
  {
    sequelize,
    tableName: "users",
    underscored: true,
    hooks:{
      beforeCreate: async (user) => {
        user.password = await bcrypt.hash(user.password, 8);
      }
    }
  }
);

export class User {

  async createUser(createUserRequest: ICreateUserRequest):Promise<IUser>{
    return await UserDb.create({
      ...createUserRequest,
      createdAt: new Date(),
      updatedAt: new Date()
    });
  };

  async getUserById(id:string):Promise<IUser>{
    return await UserDb.findByPk(id);
  };

  async updateUser(id:number,updateOptions:Partial<IUser>):Promise<[affectedCount: number, affectedRows: IUser[]]>{
    return await UserDb.update({...updateOptions},{
      returning: true,
      where:{
        id
      }
    });
  };

  async getUserByIdentifier(role: IUserRoles, identifierType: IUserIdentifier, identifierValue:string):Promise<IUser>{
    return await UserDb.findOne({
      where:{
        role,
        [identifierType] : identifierValue
      }
    });
  }

  isPassowordMatch(user:IUser, password:string){
    return bcrypt.compare(password, user.password);  
  }


}

export default User;
