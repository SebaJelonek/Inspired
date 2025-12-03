import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.withSchema("app").createTable("activities", (table) => {
    table.increments("id");
    table.string("title").notNullable().unique();
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
/*


checkPositive #

column.checkPositive([constraintName])

Specify a check on column that test if the value of column is positive.


knex.schema.createTable('product', function (table) {

  table.integer('price').checkPositive();});


i think you have outdated info

it looks legit imo


i will test it i guess

but i would need to re run migration first

so i will commit now

*/
