const dbConfig = {
  server: process.env.DB_SERVER || 'VICTUS\\SQL_ERIC',
  database: process.env.DB_DATABASE || 'videogameloans',
  options: {
    encrypt: true, 
    trustServerCertificate: true, 
  },
  authentication: {
    type: 'ntlm', 
    options: {
      domain: 'YOUR_WINDOWS_DOMAIN', 
      userName: '', 
      password: '', 
    },
  },
};

export default dbConfig;