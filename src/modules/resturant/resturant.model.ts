import { DataTypes, Model, CreationOptional } from "sequelize";
import { sequelize } from "../../config/sequelize.config";
import { ICreateResturantRequest, IResturant } from "./resturant.interface";
import { Op } from "sequelize";

class ResturantDb extends Model<IResturant> {
  declare id: CreationOptional<number>;
  declare createdAt: CreationOptional<Date>;
  declare serveStartTime: number;
  declare serveEndTime: number;
  declare name: string;
}

ResturantDb.init(
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
    serveStartTime: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    serveEndTime: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
    },
  },
  {
    sequelize,
    tableName: "resturants",
    underscored: true,
  }
);

export class Resturant {
  /**
   * Retrieves a list of restaurants that are open and able to serve food at the given delivery time.
   * @param {number} deliveryTime - The delivery time in a numerical format.
   * @returns {Promise<IRestaurant[]>} - A promise that resolves to an array of restaurant objects.
   */
  async getResturants(deliveryTime: number): Promise<IResturant[]> {
    return await ResturantDb.findAll({
      where: {
        serveStartTime: {
          [Op.lte]: Number(deliveryTime),
        },
        serveEndTime: {
          [Op.gte]: Number(deliveryTime),
        },
      },
    });
  }

  /**
   * Creates a new restaurant in the database.
   * @param {ICreateRestaurantRequest} request - The request object containing the restaurant data.
   * @returns {Promise<IRestaurant>} - A promise that resolves to the created restaurant object.
   */
  async createResturant(request: ICreateResturantRequest): Promise<IResturant> {
    return await ResturantDb.create({
      ...request,
      createdAt: new Date(),
    });
  }
}

export default Resturant;
