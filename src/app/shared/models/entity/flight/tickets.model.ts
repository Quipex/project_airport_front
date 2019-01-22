import {BaseEntityModel} from "../../baseEntity.model";
import {TicketStatusModel} from "./ticketStatus.model";

export class TicketsModel extends BaseEntityModel {
  constructor(
    public flightId?: number,
    public seatId?: number,
    public passengerId?: number,
    public ticketStatus?: TicketStatusModel,
    public ticketExtra?: number
  ) {
    super();
  }
}
