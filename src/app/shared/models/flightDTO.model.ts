import {BaseEntityModel} from "./baseEntity.model";
import {FlightsModel} from "./entity/flight/flights.model";
import {TicketsModel} from "./entity/flight/tickets.model";
import {AirportModel} from "./entity/flight/airport.model";
import {PassengersModel} from "./entity/users/passengers.model";
import {PassportModel} from "./entity/users/passport.model";
import {AirplanesModel} from "./entity/airplane/airplanes.model";
import {AirlinesModel} from "./entity/airline/airlines.model";

export class FlightDTOModel extends BaseEntityModel {
  constructor(
    public flight?: FlightsModel,
    public tickets?: TicketsModel[],
    public passengers?: PassengersModel[],
    public passports?: PassportModel[],
    public arrivalAirport?: AirportModel,
    public departureAirport?: AirportModel,
    public airplane?: AirplanesModel,
    public airline?: AirlinesModel
  ) {
    super();
  }
}
