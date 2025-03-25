import { CrudRepository } from "./types";
import { Errors } from "../errors";
import { PlayerEntity } from "../entities/player";
import { PlayerIdType } from "common/dtos";

export abstract class UserRepository extends CrudRepository<
  PlayerEntity,
  PlayerIdType
> {}

export class InMemoryUserRepository extends UserRepository {
  private readonly users: Map<PlayerIdType, PlayerEntity> = new Map();
  findAll(): Promise<PlayerEntity[]> {
    const entities = Array.from(this.users.values());
    return Promise.resolve(entities);
  }

  findById(id: PlayerIdType): Promise<PlayerEntity> {
    if (this.users.has(id)) {
      return Promise.resolve(this.users.get(id)!);
    } else {
      return Promise.reject(Errors.ENTITY_NOT_FOUND);
    }
  }

  save(entity: PlayerEntity): Promise<void> {
    this.users.set(entity.id, entity);
    return Promise.resolve();
  }

  deleteById(id: PlayerIdType): Promise<void> {
    const deleted = this.users.delete(id);
    if (deleted) {
      return Promise.resolve();
    } else {
      return Promise.reject(Errors.ENTITY_NOT_FOUND);
    }
  }
}
