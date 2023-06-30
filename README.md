# Express Database

In this workshop we're going to look at how to use express with a postgres database.

## Learning Objectives

- Explain how REST API methods interact with a relational database
- Implement a REST API backed by a database using express and postgres

## Setup

1. Fork this repository
2. Clone the forked repository onto your local machines
3. In the root directory, type `npm install`, which installs dependencies for the project

   For this exercise we will also need to configure our database:

4. In ElephantSQL, create a new instance

   ![](images/elephaphantSQLInstance.png)
   _Figure 1: A new ElephantSQL database instance_

5. Connect to your ElephantSQL instance in TablePlus or a similar tool.

6. Copy the SQL from the files in the `sql/` directory and run them in TablePlus (alternatively, you can copy them into ElephantSQL's "Browser" tool)

   - create-books.sql
   - create-pets.sql
   - insert-books.sql
   - insert-pets.sql

7. Copy the URL of your instance

8. Create a file `.env` in the **root directory** of your project. It should be right next to the `.env.example` file. It should contain a single line, which contains the _environment variable_ used to specify the url from the instance created above. See the example file for reference.

9. Type `npm start`, which starts a development server that will reload whenever you make any changes to source files.

All being well, you will have a terminal window that looks like the following:

![](images/terminal.png)

_Figure 2: The terminal window where the express server is running successfully_

## Interacting with the Database

To interact with the database we will use the [node-postgres](https://node-postgres.com/) library. We will use the [query](https://node-postgres.com/features/queries) method to send SQL queries to the database sever and receive responses. The `db/index.js` file establishes the connection to the database. Your instructor will walk through this with you.

## Demo

Your instructor will demonstrate implementing some of the books API, now using a real database. You will complete the API spec implementation

## Instructions

- Implement the [API spec](https://boolean-uk.github.io/api-express-database/standard)

## Tests

Run the following commands from your project directory to run the test suites:

```sh
$ npm test # standard criteria
$ npm run test-extensions # extension criteria
```

You can also focus on one test at a time - use the [jest docs](https://jestjs.io/docs/cli) to help filter which tests to run. We recommend you run tests manually with the option `--forceExit`.

For example, for the following test:

```js
it("will list all books", async () => {
  const response = await supertest(app).get("/books");

  expect(response.status).toEqual(200);
  expect(response.body.books).not.toEqual(undefined);
  expect(response.body.books.length).toEqual(2);
  const expectedBooks = [book1, book2];
  response.body.books.forEach((retrievedBook, index) => {
    expect(retrievedBook.title).toEqual(expectedBooks[index].title);
  });
});
```

Here are two ways to run it.

```sh
$ npx jest -t "will list all books" --forceExit
$ npx jest test/api/routes/books.spec.js --forceExit # remember to add the 'f' before it()
```

## Extension 1

- Implement the [extension API spec](https://boolean-uk.github.io/api-express-database/extension)

## Extension 2

So far we've been including all our database code directly in our route handlers. In a real application, this is considered bad practice. It would become difficult to maintain as the code base grows, and we are also mixing concerns. We have routing code, request/response handling and database access all in a single function. This leads to tight coupling and low cohesion.

It is better practice to split your code into different _layers_. This helps keep our code decoupled. Rather than your route handler implementing all your logic, you can introduce controller functions that handle your routes as well as specific functions for calling the database. There is no single "correct" approach, but here are some examples:

- [MDN Express controllers and routes](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/routes)
- [Express REST API structure](https://www.coreycleary.me/project-structure-for-an-express-rest-api-when-there-is-no-standard-way)

There is also an example boolean repository that provides a suggested structure:

- [API Express Architecture](https://github.com/boolean-uk/api-express-architecture-example)

Update your implementation to match the structure of the above repo. Controllers functions should handle your requests and responses, and repository functions should handle your database access.
