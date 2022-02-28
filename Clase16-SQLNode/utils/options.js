const path = require("path");

const optionsMySql = {
  client: "mysql",
  connection: {
    host: "localhost",
    user: "root",
    password: "",
    database: "clase16",
  },
};

const optionsSqlLite = {
  client: "better-sqlite3",
  connection: { filename: path.resolve(__dirname, "../DB/messages.db3") },
  useNullAsDefault: true,
};

module.exports = { optionsMySql, optionsSqlLite };
