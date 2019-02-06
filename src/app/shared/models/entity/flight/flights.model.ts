import {BaseEntityModel} from '../../baseEntity.model';
import {FlightStatusModel} from "./flightStatus.model";

export class FlightsModel extends BaseEntityModel {
  constructor(
    public flightNumber?: string,
    public expectedDepartureDatetime?: Date,
    public actualDepartureDatetime?: Date,
    public expectedArrivalDatetime?: Date,
    public actualArrivalDatetime?: Date,
    public airplaneId?: number,
    public baseCost?: number,
    public arrivalAirportId?: number,
    public departureAirportId?: number,
    public status?: FlightStatusModel
  ) {
    super();
  }
}
