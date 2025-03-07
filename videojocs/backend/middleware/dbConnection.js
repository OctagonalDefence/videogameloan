import sql from 'mssql';
import dbConfig from '../config/dbConfig.js';

let poolPromise;

const getPool = () => {
  if (!poolPromise) {
    poolPromise = sql.connect(dbConfig);
  }
  return poolPromise;
};

export default getPool;