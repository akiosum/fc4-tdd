import {v4 as uuidv4} from "uuid";
import {Property} from "../../../domain/entities/property";
import {PropertyEntity} from "../entities/property_entity";
import {PropertyMapper} from "./property_mapper";

it("deve converter PropertyEntity em Property corretamente", () => {
    const id = uuidv4();
    const maxGuests = 10;
    const price = 100;
    const getCount = 2;

    const entity = new PropertyEntity();
    entity.id = id;
    entity.name = "Casa com vista para mar";
    entity.description = "Casa com vista para mar bem grande";
    entity.maxGuests = maxGuests;
    entity.basePricePerNight = price;

    const property = PropertyMapper.toDomain(entity);

    expect(property.getId()).toBe(id);
    expect(property.getName()).toBe("Casa com vista para mar");
    expect(property.getDescription()).toBe("Casa com vista para mar bem grande");
    expect(property.getMaxGuests()).toBe(10);
    expect(property.getBasePricePerNight()).toBe(100);
    expect(property.getMaxGuests()).toBe(10);
});

it("deve lançar erro de validação ao faltar campos obrigatórios no PropertyEntity", () => {
    const entity = new PropertyEntity();
    entity.id = uuidv4();

    expect(() => PropertyMapper.toDomain(entity)).toThrow("O nome é obrigatório");
});

it("deve converter Property para PropertyEntity corretamente", () => {
    const id = uuidv4();
    const maxGuests = 10;
    const price = 100;

    const property = new Property(
        id,
        "Casa com vista para mar",
        "Casa com vista para mar bem grande",
        maxGuests,
        price
    );

    const entity = PropertyMapper.toPersistence(property);
    
    expect(entity.id).toBe(property.getId());
    expect(entity.name).toBe(property.getName());
    expect(entity.description).toBe(property.getDescription());
    expect(entity.maxGuests).toBe(property.getMaxGuests());
    expect(entity.basePricePerNight).toBe(property.getBasePricePerNight());
});