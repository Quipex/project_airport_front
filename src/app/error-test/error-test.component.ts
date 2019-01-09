import {Component, OnInit} from '@angular/core';
import {ErrorTestModel} from "./error-test.model";
import {ErrorTestService} from "../services/error-test.service";
import {AuthResponseModel} from "../shared/models/authResponse.model";
import {AuthorityModel} from "../shared/models/entity/users/authority.model";
import {Router} from '@angular/router';

@Component({
  selector: 'app-error-test',
  templateUrl: './error-test.component.html',
  styleUrls: ['./error-test.component.scss']
})
export class ErrorTestComponent implements OnInit {

  errors = [];

  constructor(
    private service: ErrorTestService,
    private  router: Router
  ) {
  }

  ngOnInit() {
    const currentUser: AuthResponseModel = JSON.parse(window.localStorage.getItem('currentUser'));
    if (currentUser.authority !== AuthorityModel.ROLE_ADMIN.toString()) {
      this.router.navigateByUrl('home');
    } else {
      this.service.getAll().subscribe(
        (data: object) => {
          for (let dataKey in data) {
            this.errors.push(new ErrorTestModel(+dataKey, data[dataKey]));
          }
        }
      );
    }
  }

  onClick(err: ErrorTestModel) {
    this.service.invokeItem(err.id).subscribe();
    console.log(err);
  }
}
