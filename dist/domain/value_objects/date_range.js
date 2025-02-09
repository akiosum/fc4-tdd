"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateRange = void 0;
class DateRange {
    constructor(startDate, endDate) {
        this.validateDates(startDate, endDate);
        this.startDate = startDate;
        this.endDate = endDate;
    }
    validateDates(startDate, endDate) {
        if (startDate == endDate) {
            throw new Error("A data de início e término não podem ser iguais.");
        }
        if (endDate < startDate) {
            throw new Error("A data de término deve ser posterior à data de início.");
        }
    }
    getStartDate() {
        return this.startDate;
    }
    getEndDate() {
        return this.endDate;
    }
    getTotalNights() {
        const diffTime = this.endDate.getTime() - this.startDate.getTime();
        return Math.ceil(diffTime / (1000 * 3600 * 24));
    }
    overlaps(other) {
        return (this.startDate < other.endDate && other.getStartDate() < this.endDate);
    }
}
exports.DateRange = DateRange;
