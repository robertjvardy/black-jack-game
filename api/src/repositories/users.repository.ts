import { CrudRepository } from "./types";
import { IdType, User } from "../../../common/types";
import { Errors } from "../errors";

export abstract class UserRepository extends CrudRepository<User, IdType> {}

export class InMemoryUserRepository extends UserRepository {
  private readonly users: Map<IdType, User> = new Map();
  findAll(): Promise<User[]> {
    const entities = Array.from(this.users.values());
    return Promise.resolve(entities);
  }

  findById(id: IdType): Promise<User> {
    if (this.users.has(id)) {
      return Promise.resolve(this.users.get(id)!);
    } else {
      return Promise.reject(Errors.ENTITY_NOT_FOUND);
    }
  }

  save(entity: User): Promise<void> {
    this.users.set(entity.id, entity);
    return Promise.resolve();
  }

  deleteById(id: IdType): Promise<void> {
    const deleted = this.users.delete(id);
    if (deleted) {
      return Promise.resolve();
    } else {
      return Promise.reject(Errors.ENTITY_NOT_FOUND);
    }
  }
}
