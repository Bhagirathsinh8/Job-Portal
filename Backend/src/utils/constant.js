module.exports = {
  serverConfig: {
    BASE_URL: process.env.BASE_URL || "http://localhost:5000",
    PORT: parseInt(process.env.PORT) || 5000,
    NODE_ENV: process.env.NODE_ENV || "development",
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY || "ThisismySecretKey",
  },
  db: {
    MONGO_DB_URL:
      process.env.MONGO_DB_URL || "mongodb://localhost:27017/job_portal",
  },
  status:{
    ZERO:0,
    ONE:1,
    TRUE:true,
    FALSE:false
  },
  models: {
    USER: "User",
    JOB:"Job",
    COMPANY:"Company",
    APPLICATION:"Application"
  },
};
