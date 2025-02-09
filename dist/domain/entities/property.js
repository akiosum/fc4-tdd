"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Property = void 0;
class Property {
    constructor(id, name, description, maxGuests, basePricePerNight) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.maxGuests = maxGuests;
        this.basePricePerNight = basePricePerNight;
        this.bookings = [];
        if (!name) {
            throw new Error("O nome é obrigatório");
        }
        if (maxGuests <= 0) {
            throw new Error("O número máximo de hóspedes deve ser maior que zero");
        }
        this.id = id;
        this.name = name;
        this.description = description;
        this.maxGuests = maxGuests;
        this.basePricePerNight = basePricePerNight;
    }
    getId() {
        return this.id;
    }
    getName() {
        return this.name;
    }
    getDescription() {
        return this.description;
    }
    getMaxGuests() {
        return this.maxGuests;
    }
    getBasePricePerNight() {
        return this.basePricePerNight;
    }
    validateGuestCount(guestCount) {
        if (guestCount > this.maxGuests) {
            throw new Error(`Número máximo de hóspedes excedido. Máximo permitido: ${this.maxGuests}.`);
        }
    }
    calculateTotalPrice(dateRange) {
        const totalNights = dateRange.getTotalNights();
        let totalPrice = totalNights * this.basePricePerNight;
        if (totalNights >= 7) {
            totalPrice *= 0.9;
        }
        return totalPrice;
    }
    isAvailable(dateRange) {
        return !this.bookings.some((booking) => booking.getStatus() === "CONFIRMED" &&
            booking.getDateRange().overlaps(dateRange));
    }
    addBooking(booking) {
        this.bookings.push(booking);
    }
}
exports.Property = Property;
