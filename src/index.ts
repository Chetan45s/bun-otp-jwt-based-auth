// Importing necessary modules and functions
import { Elysia } from 'elysia'; // Elysia is a web framework
import { swagger } from '@elysiajs/swagger'; // Swagger is used for API documentation
import { auth } from './auth/route'; // Auth routes
import { AuthDatabase } from './handlers/db'; // Database handler
import { jwtAccessToken } from './auth/helper'; // JWT access token helper
import { isAuthenticated } from './middleware/authentication'; // Authentication middleware
import { handleError } from './handlers/error'; // Error handler
import { userProfile } from './userProfile/route'; // User profile routes

// Creating a new instance of the database
const dataBase = new AuthDatabase();

// Defining the port on which the server will run
const port = 3000;

// Creating a new Elysia application
const app = new Elysia();

// Configuring the application
app
  .use(swagger()) // Use Swagger for API documentation
  .onError(handleError) // Use the error handler
  .use(jwtAccessToken) // Use JWT for access token
  .decorate('dataBase', () => dataBase) // Add the database to the app context
  .decorate('authCheck', isAuthenticated) // Add the authentication check to the app context
  .use(auth) // Use the auth routes
  .use(userProfile) // Use the user profile routes
  .listen(port); // Start the server on the defined port
console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
