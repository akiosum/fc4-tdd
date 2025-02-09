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
exports.BookingService = void 0;
const booking_1 = require("../../domain/entities/booking");
const date_range_1 = require("../../domain/value_objects/date_range");
const uuid_1 = require("uuid");
class BookingService {
    constructor(bookingRepository, propertyService, userService) {
        this.bookingRepository = bookingRepository;
        this.propertyService = propertyService;
        this.userService = userService;
    }
    createBooking(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            const property = yield this.propertyService.findPropertyById(dto.propertyId);
            if (!property) {
                throw new Error("Propriedade não encontrada.");
            }
            const guest = yield this.userService.findUserById(dto.guestId);
            if (!guest) {
                throw new Error("Usuário não encontrado.");
            }
            const dateRange = new date_range_1.DateRange(dto.startDate, dto.endDate); // altamente acoplado precisa de mock
            const booking = new booking_1.Booking((0, uuid_1.v4)(), property, guest, dateRange, dto.guestCount);
            yield this.bookingRepository.save(booking);
            return booking;
        });
    }
    cancelBooking(bookingId) {
        return __awaiter(this, void 0, void 0, function* () {
            const booking = yield this.bookingRepository.findById(bookingId);
            if (!booking) {
                throw new Error("Reserva não encontrada.");
            }
            booking === null || booking === void 0 ? void 0 : booking.cancel(new Date());
            yield this.bookingRepository.save(booking);
        });
    }
}
exports.BookingService = BookingService;
