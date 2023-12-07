import { Sequelize } from "sequelize";
import dotenv from "dotenv"

dotenv.config();

const db = new Sequelize({
  dialect: 'mysql',
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  logging: false, // Disable logging SQL queries (optional)
});

export default db;
