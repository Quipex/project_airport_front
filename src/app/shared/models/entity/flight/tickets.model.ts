import {BaseEntityModel} from "../../baseEntity.model";

export class TicketsModel extends BaseEntityModel {
  constructor(
    public flightId?: number,
    public seatId?: number,
    public passengerId?: number,
    public ticketStatus?: number,
    public ticketExtra?: number
  ) {
    super();
  }
}
