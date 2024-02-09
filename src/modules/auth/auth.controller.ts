import { NextFunction, Request, Response } from "express";
import { AuthService } from "./auth.service";
import { TokenService } from "../token/token.service";
import { HttpsStatusCode } from "../../utils/utils.interfaces";
import { getErrorMessages } from "../../utils/utils";

export const register = async (req: Request, res: Response) => {
  try {
    const authService = new AuthService(),
      tokenService = new TokenService();
    console.log(req.body);
    const user = await authService.register(req.body);
    if (user.error) {
      res.status(HttpsStatusCode.SUCCESS).send(user);
      return;
    }
    const tokens = await tokenService.generateAuthTokens(user.response);
    res.status(HttpsStatusCode.SUCCESS).send({ user, tokens });
  } catch (err) {
    console.error("Error in register", err);
    const errors = getErrorMessages(err?.['errors']);
    res.status(HttpsStatusCode.SOMETHING_WENT_WRONG).send({
      status: HttpsStatusCode.SOMETHING_WENT_WRONG,
      [errors.length>0 ? 'errors' : 'error']: errors || "Something Went Wrong, Please Try Again Later.",
    });
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authService = new AuthService(),
      tokenService = new TokenService();
    const user = await authService.login(req.body);
    if (user.error) {
      res.send(user);
      return;
    }
    const tokens = await tokenService.generateAuthTokens(user.response);
    res.send({ user, tokens });
  } catch (err) {
    console.error("Error in register", err);
    res.status(HttpsStatusCode.SOMETHING_WENT_WRONG).send({
      error: "Something Went Wrong, Please Try Again Later.",
    });
  }
};
