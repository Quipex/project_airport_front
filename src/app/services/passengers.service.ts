import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthenticationService} from "./authentication.service";

@Injectable()
export class PassengersService {

  private httpOptions = {
    headers: new HttpHeaders({
      'Authorization': 'Bearer ' + this.authenticationService.getToken(),
      'Content-Type': 'application/json'
    })
  };

  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService
  ) {}

  getPassengersByUserId(userLogin: string, page: number) {
    return this.http.get(`http://localhost:8080/passengers/userLogin=${userLogin}/page=${page}`, this.httpOptions);
  }
}
