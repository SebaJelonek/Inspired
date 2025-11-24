import { Knex } from "knex";

exports.up = async (knex: Knex) => {
  await knex.schema.withSchema("app").createTable("skills", (table) => {
    table.increments("skillId");
    table.string("name").notNullable();
    table.integer("level").notNullable();
    table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now());
  });
};

exports.down = async (knex: Knex) => {
  await knex.schema.withSchema("app").dropTable("skills");
};
