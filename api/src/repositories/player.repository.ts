import { CrudRepository } from "./types";
import { Errors } from "../errors";
import { PlayerEntity } from "../entities/player";
import { PlayerIdType } from "common/dtos";

export abstract class PlayerRepository extends CrudRepository<
  PlayerEntity,
  PlayerIdType
> {}

export class InMemoryPlayerRepository extends PlayerRepository {
  private readonly players: Map<PlayerIdType, PlayerEntity> = new Map();

  findAll(): Promise<PlayerEntity[]> {
    const entities = Array.from(this.players.values());
    return Promise.resolve(entities);
  }

  findById(id: PlayerIdType): Promise<PlayerEntity> {
    if (this.players.has(id)) {
      return Promise.resolve(this.players.get(id)!);
    } else {
      return Promise.reject(Errors.ENTITY_NOT_FOUND);
    }
  }

  save(entity: PlayerEntity): Promise<void> {
    this.players.set(entity.id, entity);
    return Promise.resolve();
  }

  deleteById(id: PlayerIdType): Promise<void> {
    const deleted = this.players.delete(id);
    if (deleted) {
      return Promise.resolve();
    } else {
      return Promise.reject(Errors.ENTITY_NOT_FOUND);
    }
  }
}
