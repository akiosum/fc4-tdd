"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    constructor(id, name) {
        if (!name) {
            throw new Error("O nome é obrigatório");
        }
        if (!id) {
            throw new Error("O ID é obrigatório");
        }
        this.id = id;
        this.name = name;
    }
    getId() {
        return this.id;
    }
    getName() {
        return this.name;
    }
}
exports.User = User;
