import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.withSchema("app").createTable("activities", (table) => {
    table.increments("id");
    table.string("title").notNullable();
    table.text("summary").notNullable();
    table.string("image_path").notNullable();
    table.string("first_skill").notNullable();
    table.string("second_skill");
    table.integer("age").notNullable();
    table.enu("preparation", ["Low", "Medium", "High"]).notNullable();
    table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now());
    table.boolean("isDeleted").defaultTo(false);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.withSchema("app").dropTable("activities");
}
