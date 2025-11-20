import { SkillEntity } from "app/entities/SkillEntity";

export interface SkillsStorage {
  getAll(): Promise<SkillEntity[]>;
  getById(id: number): Promise<SkillEntity | undefined>;
  insert(data: Omit<SkillEntity, "skillId" | "updateAt">): Promise<SkillEntity>;
  delete(id: number): Promise<boolean>;
}
