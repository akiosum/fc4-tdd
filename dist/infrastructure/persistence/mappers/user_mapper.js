"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMapper = void 0;
const user_1 = require("../../../domain/entities/user");
const user_entity_1 = require("../entities/user_entity");
class UserMapper {
    static toDomain(entity) {
        return new user_1.User(entity.id, entity.name);
    }
    static toPersistence(domain) {
        const entity = new user_entity_1.UserEntity();
        entity.id = domain.getId();
        entity.name = domain.getName();
        return entity;
    }
}
exports.UserMapper = UserMapper;
