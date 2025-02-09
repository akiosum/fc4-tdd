"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingMapper = void 0;
const booking_1 = require("../../../domain/entities/booking");
const date_range_1 = require("../../../domain/value_objects/date_range");
const booking_entity_1 = require("../entities/booking_entity");
const property_mapper_1 = require("./property_mapper");
const user_mapper_1 = require("./user_mapper");
class BookingMapper {
    static toDomain(entity, property) {
        const guest = user_mapper_1.UserMapper.toDomain(entity.guest);
        const dateRange = new date_range_1.DateRange(entity.startDate, entity.endDate);
        const booking = new booking_1.Booking(entity.id, property || property_mapper_1.PropertyMapper.toDomain(entity.property), guest, dateRange, entity.guestCount);
        booking["totalPrice"] = Number(entity.totalPrice);
        booking["status"] = entity.status;
        return booking;
    }
    static toPersistence(domain) {
        const entity = new booking_entity_1.BookingEntity();
        entity.id = domain.getId();
        entity.property = property_mapper_1.PropertyMapper.toPersistence(domain.getProperty());
        entity.guest = user_mapper_1.UserMapper.toPersistence(domain.getGuest());
        entity.startDate = domain.getDateRange().getStartDate();
        entity.endDate = domain.getDateRange().getEndDate();
        entity.guestCount = domain.getGuestCount();
        entity.totalPrice = domain.getTotalPrice();
        entity.status = domain.getStatus();
        return entity;
    }
}
exports.BookingMapper = BookingMapper;
