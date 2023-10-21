//Config file for db connection.



const config = {
    db: {
      /* don't expose password or any sensitive info, done only for demo */
      host: "localhost",
      port: 3000,
      user: "user",
      password: "psw",
      database: "db_se2_2023_team3",
      connectTimeout: 60000
    },
    listPerPage: 10,
  };
  module.exports = config;