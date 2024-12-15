import dotenv from "dotenv";

dotenv.config();

const isDevelopment = process.env.NODE_ENV !== "production";

const dbConfig = {
  database: isDevelopment
    ? process.env.LOCAL_DB_NAME
    : process.env.HOSTED_DB_NAME,
  username: isDevelopment
    ? process.env.LOCAL_DB_USERNAME
    : process.env.HOSTED_DB_USERNAME,
  password: isDevelopment
    ? process.env.LOCAL_DB_PASSWORD
    : process.env.HOSTED_DB_PASSWORD,
  host: isDevelopment ? process.env.LOCAL_DB_HOST : process.env.HOSTED_DB_HOST,
  port: isDevelopment ? process.env.LOCAL_DB_PORT : process.env.HOSTED_DB_PORT,
  dialect: "mysql",
  logging: false,
};

// Add dialectOptions only for production
if (!isDevelopment) {
  dbConfig.dialectOptions = {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  };
}

export default dbConfig;
