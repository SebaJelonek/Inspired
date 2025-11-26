import { Knex } from "knex";
import { z } from "zod";
import { SkillEntity, skillEntitySchema } from "app/entities/SkillEntity";
import { SkillsStorage } from "app/storages/skills/SkillsStorage";
import { Table } from "app/storages/DbSchema";

export class SkillsDbStorage implements SkillsStorage {
  constructor(private readonly database: Knex) {}

  async getAll(): Promise<SkillEntity[]> {
    const result = await this.database.table(Table.Skills).select("*");
    return z.array(skillEntitySchema).parse(result);
  }

  async getById(id: number): Promise<SkillEntity | undefined> {
    const result = await this.database
      .table(Table.Skills)
      .where("skillId", id)
      .first();
    if (result === undefined) {
      return undefined;
    }
    return skillEntitySchema.parse(result);
  }

  async insert(
    data: Omit<SkillEntity, "skillId" | "updatedAt">
  ): Promise<SkillEntity> {
    const [result] = await this.database
      .table(Table.Skills)
      .insert(data)
      .returning("*");

    return skillEntitySchema.parse(result);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.database
      .table(Table.Skills)
      .where("skillId", id)
      .delete();

    if (result > 0) {
      return true;
    }

    return false;
  }
}
