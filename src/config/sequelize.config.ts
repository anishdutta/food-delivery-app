import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './food_delivery.db',
  logging: true
});


// Now you can use the UserModel to interact with the 'users' table.
// Example: UserModel.create({ username: 'JohnDoe', email: 'john@example.com', ... });
