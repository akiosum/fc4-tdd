"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Booking = void 0;
const refund_rule_factory_1 = require("../cancelation/refund_rule_factory");
class Booking {
    constructor(id, property, guest, dateRange, guestCount) {
        this.status = "CONFIRMED";
        if (guestCount <= 0) {
            throw new Error("O número de hóspedes deve ser maior que zero.");
        }
        property.validateGuestCount(guestCount);
        if (!property.isAvailable(dateRange)) {
            throw new Error("A propriedade não está disponível para o período selecionado.");
        }
        this.id = id;
        this.property = property;
        this.guest = guest;
        this.dateRange = dateRange;
        this.guestCount = guestCount;
        this.totalPrice = property.calculateTotalPrice(dateRange);
        this.status = "CONFIRMED";
        property.addBooking(this);
    }
    getId() {
        return this.id;
    }
    getProperty() {
        return this.property;
    }
    getUser() {
        return this.guest;
    }
    getDateRange() {
        return this.dateRange;
    }
    getGuestCount() {
        return this.guestCount;
    }
    getStatus() {
        return this.status;
    }
    getTotalPrice() {
        return this.totalPrice;
    }
    getGuest() {
        return this.guest;
    }
    cancel(currentDate) {
        if (this.status === "CANCELLED") {
            throw new Error("A reserva já está cancelada.");
        }
        const checkInDate = this.dateRange.getStartDate();
        const timeDiff = checkInDate.getTime() - currentDate.getTime();
        const daysUntilCheckIn = Math.ceil(timeDiff / (1000 * 3600 * 24));
        const refundRule = refund_rule_factory_1.RefundRuleFactory.getRefundRule(daysUntilCheckIn);
        this.totalPrice = refundRule.calculateRefund(this.totalPrice);
        this.status = "CANCELLED";
    }
}
exports.Booking = Booking;
