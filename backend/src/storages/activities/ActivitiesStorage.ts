import { ActivitiesEntity } from "app/entities/ActivitiesEntity";

export interface ActivitiesStorage {
  getAll(): Promise<ActivitiesEntity[]>;
  getSince(date: Date): Promise<ActivitiesEntity[]>;
  insert(
    data: Omit<ActivitiesEntity, "id" | "updatedAt">
  ): Promise<ActivitiesEntity>;
  delete(id: number): Promise<boolean>;
}
