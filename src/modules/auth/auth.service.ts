import {
  ILoginUserRequest,
  ICreateUserRequest,
  IUser,
  IUserIdentifier,
} from "../user/user.interfaces";
import { UserService } from "../user/user.service";
import { ApiHelper } from "../../utils/utils.interfaces";

export class AuthService {
  userService: UserService;

  init() {
    this.userService = new UserService();
  }

  /**
   * Login User
   * @param {string} email
   * @param {string} password
   * @returns {Promise<IUserDoc>}
   */
  async login(loginRequest: ILoginUserRequest): Promise<ApiHelper<IUser>> {
    this.init();

    const identifier = this.getUserIdentifier(loginRequest);

    const user = await this.userService.getUser(
      loginRequest.role,
      identifier,
      loginRequest[identifier]
    );
    if (!user) {
      return {
        status: 404,
        error: `User with the given ${loginRequest[identifier]} not found`,
      };
    }
    if (
      !(await this.userService.isPasswordMatch(user, loginRequest.password))
    ) {
      return {
        status: 404,
        error: "Incorrect password",
      };
    }
    return {
      response: user,
      status: 200,
    };
  }

  private getUserIdentifier(
    request: ILoginUserRequest
  ): IUserIdentifier | undefined {
    if (request.email) {
      return IUserIdentifier.EMAIL;
    }
    if (request.username) {
      return IUserIdentifier.USERNAME;
    }
    if (request.phoneNumber) {
      return IUserIdentifier.PHONENUMBER;
    }
    return;
  }

  /**
   * Register User
   * @param {string} email
   * @param {string} password
   * @param {string} name
   * @returns {Promise<IUserDoc>}
   */
  async register(registerBody: ICreateUserRequest): Promise<ApiHelper<IUser>> {
    this.init();
    const dbRequestBody: ICreateUserRequest = {
      ...registerBody,
      isVerified: false,
      role: registerBody.role,
    };
    const user = await this.userService.createUser(dbRequestBody);
    if (!user) {
      return {
        status: 404,
        error: "Not able to create user",
      };
    }
    return {
      response: user,
      status: 200,
    };
  }
}
