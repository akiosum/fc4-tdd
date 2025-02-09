"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeORMUserRepository = void 0;
const user_mapper_1 = require("../persistence/mappers/user_mapper");
class TypeORMUserRepository {
    constructor(repository) {
        this.repository = repository;
    }
    save(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const userEntity = user_mapper_1.UserMapper.toPersistence(user);
            yield this.repository.save(userEntity);
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const userEntity = yield this.repository.findOne({ where: { id } });
            return userEntity ? user_mapper_1.UserMapper.toDomain(userEntity) : null;
        });
    }
}
exports.TypeORMUserRepository = TypeORMUserRepository;
