URL: https://chat-app-postres-graphql.herokuapp.com/

## Technologies Used

### Client

- React
- Redux
- Apollo Client
- SCSS

### Server

- Express
- Apollo Server
- PostgreSQL
- GraphQL
- BcryptJS and JsonWebToken

## To Run Code

## Client

- Run `npm install && npm start`

## Server

- Must have PostgreSQL 12 Installed
  - Can be found here: https://chat-app-postgres.herokuapp.com
- Create Database and use the queries from dbModel.sql
- Update the pg Pool information in db.js with your Postgres information
- In the Root directory of the project run `npm install`
- Then you can either run `npm start` OR `npm run dev`

## GraphQL Playground

- found on localhost:PORT/graphql
