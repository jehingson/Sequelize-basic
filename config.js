require('dotenv').config()

module.exports = {
  database: {
    username: process.env.BD_USERNAME || "root",
    password: process.env.DB_PASSWORD || "root",
    database: process.env.DB_DATABASES || "sequelize",
    host: process.env.DB_HOST || "localhost",
    dialect: process.env.DB_DIALECT || "mysql",
    define: {
      timestamps: false,

      //Genera claves foraneas de este tipo user_id en vez de userId
      undescored: true
    }
  }
}