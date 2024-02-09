# Food Delivery Platform Backend API

This repository contains the backend API implementation for a food delivery platform, built with Node.js and TypeScript. The API provides various functionalities including authentication, restaurant listing, and more. Below is a detailed overview of the project along with installation instructions, usage guidelines, and information about the technologies used.

## Table of Contents

- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [API Endpoints](#api-endpoints)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## Technologies Used

- **Node.js**: A JavaScript runtime environment for building scalable and efficient server-side applications.
- **TypeScript**: A superset of JavaScript that adds static typing and other features to the language, improving code maintainability and reliability.
- **Joi**: Used for request payload validations, enhancing the security and reliability of the service. 🔒
- **Mongoose**: Utilized Mongoose models for seamless interaction with the MongoDB database, providing a structured approach to data modeling. 🏗️
- **Sequelize**: Used as an ORM for interacting with the database, ensuring efficient data manipulation and organization.
- **Nodemon**: Facilitated automatic server restarts during development, enhancing the development workflow. 🔄
- **Moment.js**: Utilized for efficient date and time manipulation, ensuring accurate timestamp management within the service. 🕒
- **bcrypt.js**: Employed for hashing passwords, enhancing user data security. 🔐
- **jsonwebtoken**: Utilized for generating and validating JSON web tokens, enabling secure authentication for each request. 🎫
- **Jest**: Implemented unit tests using Jest for ensuring the reliability and correctness of functional components.

## Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/food-delivery-backend.git
```

2. Install dependencies:

```bash
git clone https://github.com/your-username/food-delivery-backend.git
```

3. Run the development server:

```bash
npm run dev
```

## API Endpoints

### Authentication Endpoints

- **`/v1/auth/login`** - **POST**: User login endpoint for all roles with different authentication methods.
- **`/v1/auth/register`** - **POST**: User register endpoint for all roles with different authentication methods.

### Restaurant Endpoints

- **`/v1/restaurants/get`** - **GET**: Retrieve restaurants based on a given time.

### Postman Documentation

Explore the API endpoints and test them using Postman: [API Documentation](https://documenter.getpostman.com/view/12517036/2s9YyzddUS)





- ## Testing

- **`auth.test.ts`** - **POST**: Trigger a test run.
- **`restaurant.test.ts`** - **POST**: Trigger a test run.

## Contributing

- Contributions are welcome! Feel free to submit pull requests or open issues for any improvements or features you'd like to add.


## License

- This project is licensed under the MIT License.



