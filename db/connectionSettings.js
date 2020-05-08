const connectionSettings = () => {
if (process.env.NODE_ENV === "test") return process.env.DB_CONNECTION_TEST;
else if (process.env.NODE_ENV === "dev") return dbUrl = process.env.DB_CONNECTION_DEV;
else if (process.env.NODE_ENV === "production") return  process.env.DB_CONNECTION_PROD;
}

module.exports = connectionSettings;