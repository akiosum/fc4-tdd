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
exports.TypeORMBookingRepository = void 0;
const booking_mapper_1 = require("../persistence/mappers/booking_mapper");
class TypeORMBookingRepository {
    constructor(repository) {
        this.repository = repository;
    }
    save(booking) {
        return __awaiter(this, void 0, void 0, function* () {
            const bookingEntity = booking_mapper_1.BookingMapper.toPersistence(booking);
            yield this.repository.save(bookingEntity);
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const bookingEntity = yield this.repository.findOne({
                where: { id },
                relations: ["property", "guest"],
            });
            return bookingEntity ? booking_mapper_1.BookingMapper.toDomain(bookingEntity) : null;
        });
    }
}
exports.TypeORMBookingRepository = TypeORMBookingRepository;
