import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthenticationService} from './authentication.service';
import {FilterAndSortWrapperModel} from '../shared/models/filterAndSortWrapper.model';
import {TicketDTOModel} from '../shared/models/ticketDTO.model';
import {TicketsModel} from '../shared/models/entity/flight/tickets.model';

@Injectable()
export class TicketsService {
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

  search(page: number, wrapper: FilterAndSortWrapperModel) {
    return this.http.post(`http://localhost:8080/tickets/search/page=${page}`, wrapper, this.httpOptions);
  }

  editTicket(item: TicketDTOModel) {
    return this.http.put(`http://localhost:8080/tickets`, item, this.httpOptions);
  }

  bookTickets(tickets: TicketsModel[]) {
    return this.http.put(`http://localhost:8080/tickets/book`, tickets, this.httpOptions);
  }
}
