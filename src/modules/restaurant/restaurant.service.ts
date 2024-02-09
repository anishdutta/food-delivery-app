/**
 * A service class for managing restaurant data.
 */
import { ICreateResturantRequest, IResturant } from "./restaurant.interface";
import {Restaurant} from "./restaurant.model";

export class ResturantService {
  restaurant: Restaurant;

  constructor() {
    this.restaurant = new Restaurant();
  }

  /**
   * Adds a new restaurant to the system.
   * @param {ICreateRestaurantRequest} request - The request object containing the details of the restaurant to be created.
   * @returns {Promise<IResturant>} - A promise that resolves when the restaurant is successfully created.
   */
  async addResturant(request: ICreateResturantRequest):Promise<IResturant> {
    return await this.restaurant.createRestaurant(request);
  }

  /**
   * Retrieves a list of restaurants based on the specified delivery time.
   * @param {string} deliveryTime - The delivery time in a specific format.
   * @returns {Promise<object>} - A promise that resolves to an object containing the status and error message if applicable, or the list of restaurants.
   */
  async getRestaurants(deliveryTime: string) {
    if (!this.isValidTime(deliveryTime)) {
      return {
        status: 404,
        error: "Invalid Time Format!",
      };
    }
    return await this.restaurant.getRestaurants(Number(deliveryTime));
  }

  /**
   * Checks if a given time string is valid.
   * @param {string} time - The time string to validate.
   * @returns {boolean} - True if the time is valid, false otherwise.
   */
  private isValidTime(time: string): boolean {
    if (time.length !== 4) return false;

    const hours = Number(time.substring(0, 2));
    const minutes = Number(time.substring(2, 4));

    if (isNaN(hours) || isNaN(minutes)) return false;

    if (hours < 0 || hours > 23) return false;
    if (minutes < 0 || minutes > 59) return false;

    if (minutes % 15 !== 0) return false;

    return true;
  }
}
