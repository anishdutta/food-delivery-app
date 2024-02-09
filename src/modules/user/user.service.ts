import { ApiHelper, HttpsStatusCode } from "../../utils/utils.interfaces";
import {
  ICreateUserRequest, IUser, IUserIdentifier, IUserRoles,
} from "./user.interfaces";
import {User} from "./user.model";
import bcrypt from 'bcryptjs';

export class UserService {

  user :User

  constructor(){
    this.user = new User();
  }

  /**
   * Create User
   * @param {string} IRegisterUserRequest
   * @returns {Promise<IUserDoc>}
   */
  async createUser(
    createUserRequest: ICreateUserRequest
  ): Promise<IUser> {
    const res = await this.user.createUser(createUserRequest);
    return res;
  }

  async getUser(role:IUserRoles,identifierType:IUserIdentifier, identifierValue: string):Promise<IUser | undefined>{
    return await this.user.getUserByIdentifier(role,identifierType,identifierValue) as IUser;
  }

  async isPasswordMatch(user:IUser,password:string):Promise<boolean>{
    console.log(user.password,password)
    return bcrypt.compare(password, user.password);
  }


 
}
