"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PropertyMapper = void 0;
const property_1 = require("../../../domain/entities/property");
const property_entity_1 = require("../entities/property_entity");
class PropertyMapper {
    static toDomain(entity) {
        return new property_1.Property(entity.id, entity.name, entity.description, entity.maxGuests, Number(entity.basePricePerNight));
    }
    static toPersistence(domain) {
        const entity = new property_entity_1.PropertyEntity();
        entity.id = domain.getId();
        entity.name = domain.getName();
        entity.description = domain.getDescription();
        entity.maxGuests = domain.getMaxGuests();
        entity.basePricePerNight = domain.getBasePricePerNight();
        return entity;
    }
}
exports.PropertyMapper = PropertyMapper;
