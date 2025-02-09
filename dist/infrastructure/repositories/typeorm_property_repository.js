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
exports.TypeORMPropertyRepository = void 0;
const property_mapper_1 = require("../persistence/mappers/property_mapper");
class TypeORMPropertyRepository {
    constructor(repository) {
        this.repository = repository;
    }
    save(property) {
        return __awaiter(this, void 0, void 0, function* () {
            const propertyEntity = property_mapper_1.PropertyMapper.toPersistence(property);
            yield this.repository.save(propertyEntity);
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const propertyEntity = yield this.repository.findOne({ where: { id } });
            return propertyEntity ? property_mapper_1.PropertyMapper.toDomain(propertyEntity) : null;
        });
    }
}
exports.TypeORMPropertyRepository = TypeORMPropertyRepository;
