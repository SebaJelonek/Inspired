import { SkillEntity } from "app/entities/SkillEntity";
import { SkillsStorage } from "app/storages/SkillsStorage";

export class SkillsMockStorage implements SkillsStorage {
  private skills: SkillEntity[] = [];

  async getAll(): Promise<SkillEntity[]> {
    return this.skills;
  }

  async getById(id: number): Promise<SkillEntity | undefined> {
    return this.skills.find((s) => s.skillId === id);
  }

  async insert(
    data: Omit<SkillEntity, "skillId" | "updatedAt">
  ): Promise<SkillEntity> {
    const skillEntity: SkillEntity = {
      skillId: this.skills.length + 1,
      name: data.name,
      level: data.level,
      updateAt: new Date(),
    };

    this.skills.push(skillEntity);

    return skillEntity;
  }

  async delete(id: number): Promise<boolean> {
    const skill = this.skills.find((s) => s.skillId === id);
    if (skill === undefined) {
      return false;
    }
    this.skills = this.skills.filter((s) => s.skillId !== id);
    return true;
  }
}
