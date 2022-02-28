const { optionsMySql, optionsSqlLite } = require("../utils/options");
const knex = require("knex")(optionsMySql);
const knexSqlLite = require("knex")(optionsSqlLite);

class Container {
  async save(product) {
    /*
      Query para crear la tabla
      knex.schema
      .createTable("products", (table) => {
        table.increments("id").primary();
        table.string("name", 25).notNullable();
        table.float("price").notNullable();
        table
          .string("img")
          .defaultTo(
            "https://img.favpng.com/5/19/25/shopping-cart-icon-product-return-png-favpng-1ZJU3szBCWCr5YYXDXtgqG4ja.jpg"
          );
      })
      .then(() => {
        console.log("Validacion de tabla!");
      })
      .catch((error) => {
        console.error({
          codigo: `${error.errno}|${error.code}`,
          msg: error.sqlMessage,
        });
      })
      .finally(() => {
        knex.destroy();
      });
    */
    await knex("products").insert(product);
  }

  async saveMsg(msg) {
    /* 
      Query para crear tabla 
      knexSqlLite.schema
      .createTable("messages", (table) => {
        table.increments("id").primary();
        table.string("email", 30).notNullable();
        table.string("text", 255).notNullable();
        table.timestamp("created_at").defaultTo(knexSqlLite.fn.now());
      })
      .then(() => {
        console.log("Validacion de tabla!");
      })
      .catch((error) => {
        console.error({
          codigo: `${error.errno}|${error.code}`,
          msg: error.sqlMessage,
        });
      })
      .finally(() => {
        knexSqlLite.destroy();
      });
    */
    await knexSqlLite("messages").insert(msg);
  }

  async getAll() {
    return await knex.from("products").select("*");
  }

  async getAllMsg() {
    return await knexSqlLite
      .from("messages")
      .select("*")
      .orderBy("created_at", "desc");
  }
}

module.exports = Container;
