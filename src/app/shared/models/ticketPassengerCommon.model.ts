import {BaseEntityModel} from './baseEntity.model';

export class TicketPassengerCommonModel extends BaseEntityModel {
  constructor(
    public firstName?: string,
    public lastName?: string,
    public serialNumber?: string,
    public country?: string,
    public birthDate?: Date,
    public ticketStatus?: string
  ) {
    super();
  }
}
