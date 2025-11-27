import { Knex } from "knex";
import { z } from "zod";
import {
  ActivitiesEntity,
  activitiesEntitySchema,
} from "app/entities/ActivitiesEntity";
import { ActivitiesStorage } from "app/storages/activities/ActivitiesStorage";
import { Table } from "app/storages/DbSchema";

export class ActivitiesDbStorage implements ActivitiesStorage {
  constructor(private readonly database: Knex) {}

  async getAll(): Promise<ActivitiesEntity[]> {
    const result = await this.database
      .table(Table.Activities)
      .select("*")
      .where("isDeleted", false);
    return z.array(activitiesEntitySchema).parse(result);
  }

  async getSince(date: Date): Promise<ActivitiesEntity[]> {
    const result = await this.database
      .table(Table.Activities)
      .select("*")
      .where("updatedAt", ">", date);
    return z.array(activitiesEntitySchema).parse(result);
  }

  async insert(
    data: Omit<ActivitiesEntity, "id" | "updatedAt">
  ): Promise<ActivitiesEntity> {
    const result = await this.database
      .table(Table.Activities)
      .insert(data)
      .returning("*");

    return activitiesEntitySchema.parse(result[0]);
  }

  async delete(id: number): Promise<boolean> {
    const rowsAffected = await this.database
      .table(Table.Activities)
      .where("id", id)
      .update("isDeleted", true);

    if (rowsAffected > 0) {
      return true;
    }
    return false;
  }
}
