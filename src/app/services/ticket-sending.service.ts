import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthenticationService} from "./authentication.service";
import {TicketsModel} from "../shared/models/entity/flight/tickets.model";

@Injectable()
export class TicketSendingService {

  private httpOptions = {
    headers: new HttpHeaders({
      'Authorization': 'Bearer ' + this.authenticationService.getToken(),
      'Content-Type': 'application/json'
    })
  };

  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService
  ) {
  }

  sendTicketPdfToEmail(email: string, ticket: TicketsModel) {
    return this.http.put(`http://localhost:8080/tickets/send/recipientEmail=${email}`, ticket, this.httpOptions);
  }

  getLostTicket(flightId: number, serialNumber: string) {
    return this.http.get(`/tickets/lost/onFlight=${flightId}/passport=${serialNumber}`);
  }
}
