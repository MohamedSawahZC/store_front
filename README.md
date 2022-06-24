# Storefront Backend Project


A StoreFront backend API written in NodeJS for Udacity. This application has APIs for Users, Products, and Orders.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing
purposes.


### Installing

Simply, run the following command to install the project dependencies:

```
npm i
```


### building

Simply, run the following command to install the project dependencies:

```bash
npm run build
```


### Setup environment

First, create a `.env` file with all the required environment variables:

```bash
# .env
NODE_ENV=development
PORT=3000
# Set your database connection information here
DB_HOST=localhost
DB_PORT=5432
DB_DATABASE=database_dev
DB_DATABASE_TEST=database_test
DB_USER=databaseuser
DB_PASS=password
# user
BCRYPT_PASSWORD=sawah
SALT_ROUNDS=10
TOKEN_SECRET=sawah-token
```


# Database install

## First , Database creation

- To create data base

```
create database store_front
```
- To create database for test

```
create database store_front_test
```

## Second, set your enviroment data

```
# .env
NODE_ENV=development
PORT=3000
# Set your database connection information here
DB_HOST=localhost
DB_PORT=5432
DB_DATABASE=store_front
DB_DATABASE_TEST=store_front_test
DB_USER=postgres
DB_PASS=01020262701
# user
BCRYPT_PASSWORD=your-secret-password
SALT_ROUNDS=10
TOKEN_SECRET=your-secret-token

```

- Run migrations
  
```
db-migrate up
```

# Login to Postgres
psql -U postgres

# Postgres shell
# This will list out all the databases


# If "store" database is not present
create database store; 


Next, you need to run the database migrations:

```
npm run migrations up
```

## Running the application

Use the following command to run the application in watch mode:

```bash
npm run watch
```

Use the following command to run the application in using node:

```bash
npm start
```

The application will run on <http://localhost:3000/>.

## Running the unit tests

Use the following command to run the unit tests:

```bash
npm run test
```

You may also use the Postman collection present in the repository for testing.


## Author

- ### Mohamed Sawah ###



#### Note:
- You can get routes from thunder-collection_store-fron.json 