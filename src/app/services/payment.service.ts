import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthenticationService} from "./authentication.service";
import {environment} from "../../environments/environment";

const API_URL = environment.apiUrl;

@Injectable()
export class PaymentService {
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

  addItem(userLogin: string, item: any) {
    return this.http.post(API_URL + `/payment/userLogin=${userLogin}`, item, this.httpOptions);
  }

  deleteItem(id: number) {
    return this.http.delete(API_URL + `/payment/${id}`, this.httpOptions);
  }

  getCreditCardsByUserLogin(login: string, page: number) {
  return this.http.get(API_URL + `/payment/userLogin=${login}/page=${page}`, this.httpOptions);
  }

}
