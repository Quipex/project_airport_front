import {BaseEntityModel} from '../../baseEntity.model';
import {AirportModel} from './airport.model';
import {AirplanesModel} from '../airplane/airplanes.model';
import {FlightStatusModel} from "./flightStatus.model";

export class FlightsModel extends BaseEntityModel {
  constructor(
    public flightNumber?: string,
    public expectedDepartureDatetime?: Date,
    public actualDepartureDatetime?: Date,
    public expectedArrivalDatetime?: Date,
    public actualArrivalDatetime?: Date,
    public airplane?: AirplanesModel,
    public baseCost?: number,
    public arrivalAirport?: AirportModel,
    public departureAirport?: AirportModel,
    public status?: FlightStatusModel
  ) {
    super();
  }
}
