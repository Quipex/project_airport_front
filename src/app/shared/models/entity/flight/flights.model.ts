import {BaseEntityModel} from '../../baseEntity.model';
import {AirportModel} from './airport.model';
import {AirplanesModel} from '../airplane/airplanes.model';

export class FlightsModel extends BaseEntityModel {
  constructor(
    public flightNumber?: number,
    public departureDatetime?: Date,
    public arrivalDatetime?: Date,
    public airplane?: AirplanesModel,
    public baseCost?: number,
    public arrivalAirport?: AirportModel,
    public departureAirport?: AirportModel,
    public status?: string
  ) {
    super();
  }
}
