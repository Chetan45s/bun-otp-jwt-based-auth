// Importing necessary modules and functions
import { Database } from 'bun:sqlite'; // SQLite database
import { IGenericObject, deleteTable, getKeyValue, insertRow, updateTable } from './helper'; // Helper functions for database operations

// Interface for User
export interface IUser {
  id?: number;
  phone: string;
  name: string;
  createdAt: string;
  email: string;
}

// Enum for table names
export enum tableName {
  USER = 'userDb',
  CODE = `codeDb`,
}

// Class for AuthDatabase
export class AuthDatabase {
  public db: Database; // SQLite database instance

  constructor() {
    this.db = new Database('main.db', { create: true }); // Create a new SQLite database or open if it exists
    // Initialize the database
    this.init()
      .then(() => console.log('Database initialized')) // Log on successful initialization
      .catch((e: any) => console.error(e)); // Log any errors
  }

  // Function to execute a query
  async executeQuery(query: string, keyValue: IGenericObject) {
    return this.db.prepare(query).all(keyValue); // Prepare and execute the query
  }

  // Function to execute a select query
  async executeSelectQuery(query: string, body: IGenericObject) {
    const { keyValueString, keyValueObject } = getKeyValue(body); // Get key-value pairs from the body
    query += ` WHERE ${keyValueString.replace(',', ' AND ')}`; // Append WHERE clause to the query
    return this.db.prepare(query).all(keyValueObject); // Prepare and execute the query
  }

  // Function to add a row to a table
  async addRow(tableName: string, body: object) {
    const { query, keyValue } = insertRow(tableName, body); // Get the insert query and key-value pairs
    return this.db.prepare(query).all(keyValue); // Prepare and execute the query
  }

  // Function to update a row in a table
  async updateRow(tableName: string, body: object, conditionBody: object) {
    const { query, keyValue } = updateTable(tableName, body, conditionBody); // Get the update query and key-value pairs
    return this.db.prepare(query).all(keyValue); // Prepare and execute the query
  }

  // Function to delete a row from a table
  async deleteRow(tableName: string, conditionBody: object) {
    const { query, keyValue } = deleteTable(tableName, conditionBody); // Get the delete query and key-value pairs
    return this.db.prepare(query).all(keyValue); // Prepare and execute the query
  }

  // Function to initialize the user database
  // Initialize the database
  async initCodeDb() {
    return this.db.run(
      `CREATE TABLE IF NOT EXISTS ${tableName.CODE} (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        createdAt TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
        otp VARCHAR(60), 
        phone VARCHAR(60),
        source VARCHAR(60)
        )`,
    );
  }
  async initUserDb() {
    return this.db.run(
      `CREATE TABLE IF NOT EXISTS ${tableName.USER} (
        id INTEGER PRIMARY KEY, 
        createdAt TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
        name VARCHAR(60), 
        phone VARCHAR(15),
        password VARCHAR(60),
        token TEXT DEFAULT NULL,
        refreshToken TEXT DEFAULT NULL,
        )`,
    ); // Create the user table if it doesn't exist
  }

  // Function to initialize the database
  async init() {
    try {
      await this.initCodeDb();
      await this.initUserDb(); // Initialize the user database
    } catch (e: any) {
      console.error(e); // Log any errors
    }
  }
}
