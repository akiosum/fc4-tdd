import {v4 as uuidv4} from "uuid";
import {PropertyEntity} from "../entities/property_entity";
import {BookingEntity} from "../entities/booking_entity";
import {BookingMapper} from "./booking_mapper";
import {Property} from "../../../domain/entities/property";
import {User} from "../../../domain/entities/user";
import {UserEntity} from "../entities/user_entity";
import {DateRange} from "../../../domain/value_objects/date_range";
import {Booking} from "../../../domain/entities/booking";

const DEFAULT_STATUS = "CONFIRMED";

describe("Booking Mapper", () => {

    it("deve converter BookingEntity em Booking corretamente", () => {
        const id = uuidv4();
        const maxGuests = 10;
        const price = 100;
        const getCount = 2;

        const propertyEntity = new PropertyEntity();
        propertyEntity.id = id;
        propertyEntity.name = "Casa com vista para mar";
        propertyEntity.description = "Casa com vista para mar bem grande";
        propertyEntity.maxGuests = maxGuests;
        propertyEntity.basePricePerNight = price;

        const userEntity = new UserEntity();
        userEntity.id = id;
        userEntity.name = "Akio";

        const bookingEntity = new BookingEntity();
        bookingEntity.id = id;
        bookingEntity.property = propertyEntity;
        bookingEntity.guest = userEntity;
        bookingEntity.startDate = new Date();
        bookingEntity.endDate = new Date();
        bookingEntity.guestCount = getCount;
        bookingEntity.totalPrice = price;
        bookingEntity.status = DEFAULT_STATUS;

        const booking = BookingMapper.toDomain(bookingEntity);

        expect(booking.getId()).toBe(id);
        expect(booking.getProperty()).toBeInstanceOf(Property);
        expect(booking.getGuest()).toBeInstanceOf(User);
        expect(booking.getDateRange()).toBeInstanceOf(DateRange);
        expect(booking.getGuestCount()).toBe(getCount);
        expect(booking.getTotalPrice()).toBe(price);
        expect(booking.getStatus()).toBe(DEFAULT_STATUS);
    });

    it("deve lançar erro de validação ao faltar campos obrigatórios no BookingEntity", () => {
        const id = uuidv4();
        const maxGuests = 10;
        const price = 100;

        const propertyEntity = new PropertyEntity();
        propertyEntity.id = id;
        propertyEntity.name = "Casa com vista para mar";
        propertyEntity.description = "Casa com vista para mar bem grande";
        propertyEntity.maxGuests = maxGuests;
        propertyEntity.basePricePerNight = price;

        const userEntity = new UserEntity();
        userEntity.id = id;
        userEntity.name = "Akio";

        const bookingEntity = new BookingEntity();
        bookingEntity.id = id;
        bookingEntity.property = propertyEntity;
        bookingEntity.guest = userEntity;
        bookingEntity.startDate = new Date();
        bookingEntity.endDate = new Date();
        bookingEntity.guestCount = -1;
        bookingEntity.totalPrice = price;
        bookingEntity.status = DEFAULT_STATUS;

        expect(() => BookingMapper.toDomain(bookingEntity)).toThrow(
            "O número de hóspedes deve ser maior que zero."
        );
    });

    it("deve converter Booking para BookingEntity corretamente", () => {
        const id = uuidv4();
        const maxGuests = 10;
        const price = 100;
        const getCount = 2;

        const property = new Property(
            id,
            "Casa com vista para mar",
            "Casa com vista para mar bem grande",
            maxGuests,
            price
        );

        const user = new User(id, "Akio");

        const dateRange = new DateRange(
            new Date("2025-02-01"),
            new Date("2025-02-02")
        );

        const booking = new Booking(id, property, user, dateRange, getCount);
        const bookingEntity = BookingMapper.toPersistence(booking);

        expect(bookingEntity.id).toBe(id);
        expect(bookingEntity.property).toBeInstanceOf(PropertyEntity);
        expect(bookingEntity.guest).toBeInstanceOf(UserEntity);
        expect(bookingEntity.startDate).toEqual(dateRange.getStartDate());
        expect(bookingEntity.endDate).toEqual(dateRange.getEndDate());
        expect(bookingEntity.guestCount).toBe(getCount);
        expect(bookingEntity.totalPrice).toBe(price);
        expect(bookingEntity.status).toBe(DEFAULT_STATUS);
    });
});