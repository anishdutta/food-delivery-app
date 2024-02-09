import {Restaurant} from "../src/modules/restaurant/restaurant.model";
import { ResturantService } from "../src/modules/restaurant/restaurant.service"
import { sequelize } from "../src/config/sequelize.config";

jest.mock('../src/modules/restaurant/restaurant.model', () => {
    const { Sequelize, DataTypes, Model } = jest.requireActual('sequelize');
    return {
      __esModule: true,
      default: {
        getResturants: jest.fn(),
        createResturant: jest.fn()
      },
      ResturantDb: {
        init: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn()
      }
    };
  });


  jest.mock('../src/modules/restaurant/restaurant.model', () => {
    return {
      Restaurant: jest.fn().mockImplementation(() => ({
        // Mocked methods and properties of the Restaurant class
        getRestaurants: jest.fn().mockResolvedValue([{
            name:"Test Restaurant",
            serveStartTime: 1200,
            serveEndTime: 2300,
            id: 1,
            created: new Date()
        }]),
        createRestaurant: jest.fn().mockResolvedValue({
            name:"Test Restaurant",
            serveStartTime: 1200,
            serveEndTime: 2300,
            id: 1,
            created: new Date()
        })
      })),
    };
  });
describe('Restaurant servive',()=>{

    test('Restaurant get endpoint',async ()=>{
        const resturantService = new ResturantService();
        const res = await resturantService.addResturant({
            name:"Test Restaurant",
            serveStartTime: 1200,
            serveEndTime: 2300
        })
        expect(res.id).toStrictEqual(1);
    })

    test('Restaurant get',async()=>{
        const resturantService = new ResturantService();
        const res = await resturantService.getRestaurants('1300')
        expect(res).toStrictEqual([{
            name:"Test Restaurant",
            serveStartTime: 1200,
            serveEndTime: 2300,
            id: 1,
            created: new Date()
        }]);
    })
    test('Restaurant get invalid time',async()=>{
        const resturantService = new ResturantService();
        const res = await resturantService.getRestaurants('4300')
        expect(res).toStrictEqual({"error": "Invalid Time Format!", "status": 404});
    });
})