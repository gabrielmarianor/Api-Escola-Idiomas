const mysql = require('mysql');

// Ajuste via variáveis de ambiente ou altere os valores padrão abaixo
const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'escola_idiomas'
});

module.exports = pool;
