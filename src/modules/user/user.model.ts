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

  /**
   * Creates a new user in the database with the provided user information.
   * @param {ICreateUserRequest} createUserRequest - The request object containing the user information.
   * @returns {Promise<IUser>} - A promise that resolves to the created user object.
   */
  async createUser(createUserRequest: ICreateUserRequest):Promise<IUser>{
    return await UserDb.create({
      ...createUserRequest,
  /**
   * Retrieves a user from the database based on their ID.
   * @param {string} id - The ID of the user to retrieve.
   * @returns {Promise<IUser>} A promise that resolves to the user object.
   */
      createdAt: new Date(),
      updatedAt: new Date()
    });
  };

  /**
   * Retrieves a user from the database based on their ID.
   * @param {string} id - The ID of the user to retrieve.
   * @returns {Promise<IUser>} A promise that resolves to the user object.
   */
  async getUserById(id:string):Promise<IUser>{
    return await UserDb.findByPk(id);
  };

  /**
   * Updates a user in the database with the specified ID using the provided update options.
   * @param {number} id - The ID of the user to update.
   * @param {Partial<IUser>} updateOptions - The partial user object containing the fields to update.
   * @returns {Promise<[affectedCount: number, affectedRows: IUser[]]>} - A promise that resolves to an array containing the number of affected rows and the updated user objects.
   */
  async updateUser(id:number,updateOptions:Partial<IUser>):Promise<[affectedCount: number, affectedRows: IUser[]]>{
    return await UserDb.update({...updateOptions},{
      returning: true,
      where:{
        id
      }
    });
  };

  /**
   * Retrieves a user from the database based on the given role, identifier type, and identifier value.
   * @param {IUserRoles} role - The role of the user.
   * @param {IUserIdentifier} identifierType - The type of identifier to search for (e.g. email, username).
   * @param {string} identifierValue - The value of the identifier to search for.
   * @returns {Promise<IUser>} - A promise that resolves to the user object if found, or null if not found.
   */
  async getUserByIdentifier(role: IUserRoles, identifierType: IUserIdentifier, identifierValue:string):Promise<IUser>{
    return await UserDb.findOne({
      where:{
        role,
        [identifierType] : identifierValue
      }
    });
  }

  /**
   * Checks if the provided password matches the hashed password stored in the user object.
   * @param {IUser} user - The user object containing the hashed password.
   * @param {string} password - The password to compare.
   * @returns {boolean} - True if the password matches, false otherwise.
   */
  isPassowordMatch(user:IUser, password:string):boolean{
    return bcrypt.compare(password, user.password);  
  }


}
