import {BaseEntityModel} from "./baseEntity.model";
import {TicketsModel} from "./entity/flight/tickets.model";
import {FlightsModel} from "./entity/flight/flights.model";
import {PassengersModel} from "./entity/users/passengers/passengers.model";
import {AirportModel} from "./entity/flight/airport.model";
import {AirplanesModel} from "./entity/airplane/airplanes.model";
import {AirlinesModel} from "./entity/airline/airlines.model";
import {PassportModel} from "./entity/users/passengers/passport.model";

export class TicketDTOModel extends BaseEntityModel {
  constructor(
    public ticket?: TicketsModel,
    public flight?: FlightsModel,
    public passenger?: PassengersModel,
    public arrivalAirport?: AirportModel,
    public departureAirport?: AirportModel,
    public airplane?: AirplanesModel,
    public airline?: AirlinesModel,
    public passport?: PassportModel
  ) {
    super();
  }
}
