import dotenv from 'dotenv';

dotenv.config();

const dbConfig = {
  server: "localhost",
  database: process.env.DB_DATABASE || "videogameloans",
  user: "victus",
  password: "victus",
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

console.log('DB Config:', dbConfig);

export default dbConfig;