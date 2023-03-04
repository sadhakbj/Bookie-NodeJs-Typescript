# Bookie - A secured RESTful API for books and authors

Bookie is a secured RESTful API that allows users to view and manage books, authors, and their information. The app is built with NodeJS, TypeScript, MySQL, TypeORM, Class Validator, and JWT. It provides CRUD functionality for books and authors, and users can register and log in to access the protected routes.

## Features

- CRUD operations for books and authors
- Authentication and authorization with JWT
- Validation with Class Validator
- Pagination support
- Error handling



## Setup

1. Clone the repository: `https://github.com/sadhakbj/Bookie-NodeJs-Typescript bookie-ts`
2. `cd bookie-ts`
3. Copy the `.env.example` file to `.env` and update the necessary variables: `cp .env.example .env`
4. Install the dependencies: `yarn install` or `yarn`
5. Run the migrations: `yarn migrate`
6. Boot the server: `yarn dev`
7. Access the REST api on the url `http://localhost:3000` or the port you specified in `.env`

## Tools and Technologies Used
- NodeJS
- TypeScript
- MySQL
- TypeORM
- Class Validator
- JWT

## Running via Docker
To run Bookie via Docker, set the `DB_HOST` environment variable to `"mysql"` in the `.env` file. Then run the following command:
`docker compose up --build`

his will build and run the Docker container for the app and the MySQL database. You can then access the app at `http://localhost:3000`.

Make sure that you have Docker installed on your machine before running this command. You can download Docker [here](https://www.docker.com/get-started).


## Available scripts

- `typeorm`: Runs the TypeORM CLI with the `data-source.ts` file.
- `migration:show`: Shows all the executed migrations.
- `migration:create`: Creates a new migration. You need to provide a name for the migration. Example: `yarn migration:create create_users_table`.
- `migration:run`: Runs all pending migrations.
- `migration:revert`: Reverts the last executed migration.

## Creating a new migration

To create a new migration, run the following command:

`yarn migration:create <migration-name>` for example: `yarn migration:create create_users_table`

> This will create a new migration file in the `src/database/migrations` directory.

You can then edit the migration file and define the necessary schema changes.

## Reverting a migration

To revert the last executed migration, run the following command: `yarn migration:revert`

## API endpoints

### Books

- `GET /books`: Get all books
- `GET /books/:id`: Get a book by ID
- `POST /books`: Create a new book (requires authentication)
- `PUT /books/:id`: Update a book by ID (requires authentication)
- `DELETE /books/:id`: Delete a book by ID (requires authentication)

### Authors

- `GET /authors`: Get all authors
- `GET /authors/:id`: Get an author by ID
- `POST /authors`: Create a new author (requires authentication)
- `PUT /authors/:id`: Update an author by ID (requires authentication)
- `DELETE /authors/:id`: Delete an author by ID (requires authentication)

### Authentication

- `POST /auth/register`: Register a new user
- `POST /auth/login`: Login and get an access token

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.





