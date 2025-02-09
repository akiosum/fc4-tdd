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
exports.FakeUserRepository = void 0;
const user_1 = require("../../domain/entities/user");
class FakeUserRepository {
    constructor() {
        this.users = [
            new user_1.User("1", "John Doe"),
            new user_1.User("2", "Jane Smith"),
        ];
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.users.find((user) => user.getId() === id) || null;
        });
    }
    save(user) {
        return __awaiter(this, void 0, void 0, function* () {
            this.users.push(user);
        });
    }
}
exports.FakeUserRepository = FakeUserRepository;
