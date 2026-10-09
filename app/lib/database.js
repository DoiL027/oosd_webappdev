import { createPool } from "mysql2/promise";

// Create connection pool
const pool = createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "cprg210user",
  database: process.env.DB_NAME || "oosd_webappdev",
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  connectTimeout: 60000,
  dateStrings: true,
});

export default pool;
