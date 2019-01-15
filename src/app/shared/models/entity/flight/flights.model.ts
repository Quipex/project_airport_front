import {BaseEntityModel} from "../../baseEntity.model";
import {AirportModel} from "./airport.model";

export class FlightsModel extends BaseEntityModel {
  constructor(
    public departureDatetime?: Date,
    public arrivalDatetime?: Date,
    public airplaneId?: number,
    public baseCost?: number,
    public arrivalAirport?: AirportModel,
    public departureAirport?: AirportModel
  ) {
    super();
  }
}
