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
exports.BookingController = void 0;
class BookingController {
    constructor(bookingService) {
        this.bookingService = bookingService;
    }
    createBooking(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const startDate = new Date(req.body.startDate);
                const endDate = new Date(req.body.endDate);
                if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
                    return res
                        .status(400)
                        .json({ message: "Data de início ou fim inválida." });
                }
                const dto = {
                    propertyId: req.body.propertyId,
                    guestId: req.body.userId,
                    startDate: startDate,
                    endDate: endDate,
                    guestCount: req.body.guestCount,
                };
                const booking = yield this.bookingService.createBooking(dto);
                return res.status(201).json({
                    message: "Booking created successfully",
                    booking: {
                        id: booking.getId(),
                        propertyId: booking.getProperty().getId(),
                        guestId: booking.getGuest().getId(),
                        startDate: booking.getDateRange().getStartDate(),
                        endDate: booking.getDateRange().getEndDate(),
                        guestCount: booking.getGuestCount(),
                        totalPrice: booking.getTotalPrice(),
                        status: booking.getStatus(),
                    },
                });
            }
            catch (error) {
                return res
                    .status(400)
                    .json({ message: error.message || "An unexpected error occurred" });
            }
        });
    }
    cancelBooking(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const bookingId = req.params.id;
                yield this.bookingService.cancelBooking(bookingId);
                return res
                    .status(200)
                    .json({ message: "Reserva cancelada com sucesso." });
            }
            catch (error) {
                return res.status(400).json({ message: "Reserva não encontrada." });
            }
        });
    }
}
exports.BookingController = BookingController;
