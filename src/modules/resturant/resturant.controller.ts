import { HttpsStatusCode } from "../../utils/utils.interfaces";
import { Request, Response } from "express";
import { getErrorMessages, validateAuthToken } from "../../utils/utils";
import { ResturantService } from "./resturant.service";


export const get = async (req: Request, res: Response) => {
    try {
      const request = req.body;
      await validateAuthToken(request.token);
      const resturantService = new ResturantService();
      const message = await resturantService.getResturants(request.deliveryTime);
      res.status(HttpsStatusCode.SUCCESS).send({ message });
    } catch (err) {
      console.error("Error in get", err);
      const message =  getErrorMessages(err?.['errors'])
      res.status(HttpsStatusCode.SOMETHING_WENT_WRONG).send({
        status: HttpsStatusCode.SOMETHING_WENT_WRONG,
        error: message ||
          Object.keys(err).length > 0
            ? err
            : JSON.stringify(err) ||
              "Something Went Wrong, Please Try Again Later.",
      });
    }
  };

export const add = async (req: Request, res: Response) => {
    try {
      const request = req.body;
      await validateAuthToken(request.token);
      const resturantService = new ResturantService();
      const message = await resturantService.addResturant(request);
      res.status(HttpsStatusCode.SUCCESS).send({ message });
    } catch (err) {
      console.error("Error in add", err);
      const message =  getErrorMessages(err?.['errors'])
      res.status(HttpsStatusCode.SOMETHING_WENT_WRONG).send({
        status: HttpsStatusCode.SOMETHING_WENT_WRONG,
        error: message ||
          Object.keys(err).length > 0
            ? err
            : JSON.stringify(err) ||
              "Something Went Wrong, Please Try Again Later.",
      });
    }
  };