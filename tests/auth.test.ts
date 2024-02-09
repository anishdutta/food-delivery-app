import {AuthService} from "../src/modules/auth/auth.service";
import { ResturantService } from "../src/modules/restaurant/restaurant.service"
import { sequelize } from "../src/config/sequelize.config";
import { IUserRoles } from "../src/modules/user/user.interfaces";

jest.mock('../src/modules/restaurant/restaurant.model', () => {
    const { Sequelize, DataTypes, Model } = jest.requireActual('sequelize');
    return {
      __esModule: true,
      default: {
        getResturants: jest.fn(),
        createResturant: jest.fn()
      },
      UserDb: {
        init: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn()
      }
    };
  });


  jest.mock('../src/modules/user/user.model', () => {
    return {
      User: jest.fn().mockImplementation(() => ({
        // Mocked methods and properties of the Restaurant class
        getUserById: jest.fn().mockResolvedValue([{
            name:"Test user",
            email: 'anish2000@gmail.com',
            password: "$2a$08$u.Co9uo5Pv.1LETPYXcLx.WRYIVos0lWapcfpQvz5MdDLPkC6DXrC	",
            id: 1,
            created: new Date()
        }]),
        getUserByIdentifier: jest.fn().mockResolvedValue({
            name:"Test user",
            email: 'anish2000@gmail.com',
            password: "$2a$08$u.Co9uo5Pv.1LETPYXcLx.WRYIVos0lWapcfpQvz5MdDLPkC6DXrC",
            id: 1,
            created: new Date()
        }),
        createUser: jest.fn().mockResolvedValue({
            name:"Test user",
            email: 'anish2000@gmail.com',
            password: "$2a$08$u.Co9uo5Pv.1LETPYXcLx.WRYIVos0lWapcfpQvz5MdDLPkC6DXrC",
            id: 1,
            created: new Date()
        })
      })),
    };
  });
describe('Auth servive',()=>{

    test('user login',async ()=>{
        const auth = new AuthService();
        const res = await auth.login({
            password: "20i-e3fur",
            email:"anish20127.ad@gmail.com",
            role: IUserRoles.CUSTOMER,
            isVerified: false,
            createdAt: new Date(),
            updatedAt: new Date(),
            id: 1
        })
        expect(res).toStrictEqual({"response": {"created": expect.any(Date), "email": "anish2000@gmail.com", "id": 1, "name": "Test Restaurant", "password": "$2a$08$u.Co9uo5Pv.1LETPYXcLx.WRYIVos0lWapcfpQvz5MdDLPkC6DXrC"}, "status": 200});
    })

    test('resgister user',async ()=>{
        const auth = new AuthService();
        const res = await auth.register({
            password: "20i-e3fur",
            email:"anish20127.ad@gmail.com",
            role: IUserRoles.CUSTOMER,
            isVerified: false,
            createdAt: new Date(),
            updatedAt: new Date(),
            name:"My test name"
        })
        expect(res).toStrictEqual({"response": {"created": expect.any(Date), "email": "anish2000@gmail.com", "id": 1, "name": "Test user", "password": "$2a$08$u.Co9uo5Pv.1LETPYXcLx.WRYIVos0lWapcfpQvz5MdDLPkC6DXrC"}, "status": 200});
    })
})