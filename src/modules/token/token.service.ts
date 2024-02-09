import jwt from "jsonwebtoken";
import moment, { Moment } from "moment";
import { AccessAndRefreshTokens } from "./token.interfaces";
import { IUser } from "../user/user.interfaces";
import {User} from "../user/user.model";
import config from "../../config/db.config";

export class TokenService {
  user: User;

  constructor() {
    this.user = new User();
  }

  /**
   * Generates a JWT token for the given user ID and expiration date.
   * @param {number} userId - The ID of the user.
   * @param {Moment} expires - The expiration date of the token.
   * @param {string} [secret=config.jwt.secret] - The secret key used to sign the token.
   * @returns {string} The generated JWT token.
   */
  generateToken(
    userId: number,
    expires: Moment,
    secret: string = config.jwt.secret
  ): string {
    const payload = {
      sub: userId,
      iat: moment().unix(),
      exp: expires.unix(),
    };
    return jwt.sign(payload, secret);
  }

  /**
   * Save a token
   * @param {string} token
   * @param {mongoose.Types.ObjectId} userId
   * @param {Moment} expires
   * @returns {Promise<ITokenDoc>}
   */
  async saveToken(token: string, userId: number) {
    const user = await this.user.updateUser(userId, {
      token,
    });
    return user;
  }

  /**
   * Generate auth tokens
   * @param {IUserDoc} user
   * @returns {Promise<AccessAndRefreshTokens>}
   */
  async generateAuthTokens(user: IUser): Promise<AccessAndRefreshTokens> {
    const accessTokenExpires = moment().add(
      config.jwt.accessExpirationMinutes,
      "minutes"
    );
    const accessToken = this.generateToken(user.id, accessTokenExpires);

    const refreshTokenExpires = moment().add(
      config.jwt.refreshExpirationDays,
      "days"
    );
    const refreshToken = this.generateToken(user.id, refreshTokenExpires);
    await this.saveToken(refreshToken, user.id);

    return {
      access: {
        token: accessToken,
        expires: accessTokenExpires.toDate(),
      },
      refresh: {
        token: refreshToken,
        expires: refreshTokenExpires.toDate(),
      },
    };
  }

  /**
   * Verifies the authenticity of a token and returns the corresponding user document.
   * @param {string} token - The token to verify.
   * @returns {Promise<IUser>} - A promise that resolves to the user document associated with the token.
   * @throws {Error} - If the token is invalid or the user is not found.
   */
  async verifyToken(token: string): Promise<IUser> {
    const payload = jwt.verify(token, config.jwt.secret);
    console.log(payload);
    if (!payload.sub) {
      throw new Error("bad user");
    }
    const userDoc = await this.user.getUserById(payload.sub);
    if (!userDoc) {
      throw new Error("Token not found");
    }
    return userDoc;
  }
}
