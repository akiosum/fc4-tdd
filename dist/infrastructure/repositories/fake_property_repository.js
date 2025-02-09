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
exports.FakePropertyRepository = void 0;
const property_1 = require("../../domain/entities/property");
class FakePropertyRepository {
    constructor() {
        this.properties = [
            new property_1.Property("1", "Apartamento", "Apartamento moderno", 4, 100),
            new property_1.Property("2", "Casa de Praia", "Casa com vista para o mar", 6, 200),
        ];
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            return (_a = this.properties.find((property) => property.getId() === id)) !== null && _a !== void 0 ? _a : null;
        });
    }
    save(property) {
        return __awaiter(this, void 0, void 0, function* () {
            this.properties.push(property);
        });
    }
}
exports.FakePropertyRepository = FakePropertyRepository;
