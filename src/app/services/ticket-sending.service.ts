import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthenticationService} from "./authentication.service";
import {TicketsModel} from "../shared/models/entity/flight/tickets.model";
import {ToastrService} from "ngx-toastr";

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
    private authenticationService: AuthenticationService,
    private toastr: ToastrService
  ) {
  }

  sendTicket(email: string, ticket: TicketsModel) {
    this.sendTicketPdfToEmail(email, ticket)
      .subscribe((data: boolean) => {
        if (data === true) {
          this.toastr.info("Ticket is on the way to you'r mail!")
        } else {
          this.toastr.error("Ticket couldn't be send :(")
        }
      })
  }

  sendTicketPdfToEmail(email: string, ticket: TicketsModel) {
    return this.http.put(`http://localhost:8080/tickets/send/recipientEmail=${email}`, ticket, this.httpOptions);
  }

  getLostTicket(flightId: number, serialNumber: string) {
    return this.http.get(`http://localhost:8080/tickets/lost/onFlight=${flightId}/passport=${serialNumber}`);
  }
}
