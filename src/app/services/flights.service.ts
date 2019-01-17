import {Injectable} from "@angular/core";
import {AuthenticationService} from "./authentication.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable()
export class FlightsService {

  private httpOptions = {
    headers: new HttpHeaders({
      'Authorization': 'Bearer ' + this.authenticationService.getToken(),
      'Content-Type': 'application/json'
    })
  };

  constructor(
    private authenticationService: AuthenticationService,
    private http: HttpClient
  ) {}

  getFlightsByUserLogin(userLogin: string, page: number) {
    return this.http.get(`http://localhost:8080/flights/userLogin=${userLogin}/page=${page}`, this.httpOptions);
  }
}
