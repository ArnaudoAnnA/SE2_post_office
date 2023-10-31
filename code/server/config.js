//Config file for db connection.



const config = {
    db: {
      /* don't expose password or any sensitive info, done only for demo */
      host: "localhost",
      port: 3306,
      user: "root",
      //password: "psw",            //TO DO: use password
      database: "db_se2_2023_team3",
      connectTimeout: 60000
    },
    listPerPage: 10,
    web_server: {
      host: "localhost",
      port: 3000
    }
  };
  module.exports = config;