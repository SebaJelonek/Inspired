import { ActivitiesEntity } from "app/entities/ActivitiesEntity";
import { ActivitiesStorage } from "app/storages/activities/ActivitiesStorage";

export class ActivitiesMockStorage implements ActivitiesStorage {
  private activities: ActivitiesEntity[] = [];

  async getAll(): Promise<ActivitiesEntity[]> {
    return this.activities.filter(({ isDeleted }) => isDeleted === false);
  }

  async getSince(date: Date): Promise<ActivitiesEntity[]> {
    return this.activities.filter(({ updatedAt }) => updatedAt > date);
  }

  async insert(
    data: Omit<ActivitiesEntity, "id" | "updatedAt">
  ): Promise<ActivitiesEntity> {
    const activity: ActivitiesEntity = {
      id: this.activities.length + 1,
      updatedAt: new Date(),
      ...data,
      isDeleted: false,
    };

    this.activities.push(activity);
    return activity;
  }

  async delete(id: number): Promise<boolean> {
    const toDelete: ActivitiesEntity | undefined = this.activities.find(
      (a) => a.id === id
    );

    if (toDelete) {
      toDelete.isDeleted = true;
      toDelete.updatedAt = new Date();
      return toDelete.isDeleted;
    }

    return false;
  }
}
