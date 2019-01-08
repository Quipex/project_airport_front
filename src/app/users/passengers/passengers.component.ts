import { Component, OnInit } from '@angular/core';
import {FormGroup} from "@angular/forms";
import {PassengersService} from "../../services/passengers.service";
import {AuthResponseModel} from "../../shared/models/authResponse.model";
import {AuthorityModel} from "../../shared/models/entity/users/authority.model";
import {Router} from "@angular/router";
import {PassportsService} from "../../services/passports.service";
import {BaseEntityModel} from "../../shared/models/baseEntity.model";
import {PassengersModel} from "../../shared/models/entity/users/passengers.model";

@Component({
  selector: 'app-passengers',
  templateUrl: './passengers.component.html',
  styleUrls: ['./passengers.component.scss'],
  providers: [PassengersService, PassportsService]
})
export class PassengersComponent implements OnInit {

  passengers=[];
  passports = [];
  items: BaseEntityModel[];
  form: FormGroup;
  newPassenger: PassengersModel;
  constructor(
    private router: Router,
    private passengersService: PassengersService,
    private passportsService: PassportsService,
  ) { }

  ngOnInit() {

    const currentUser: AuthResponseModel = JSON.parse(window.localStorage.getItem('currentUser'));
    if (currentUser === null || currentUser.authority === null) {
      this.router.navigateByUrl('login');
    } else if (currentUser.authority !== AuthorityModel.ROLE_USER.toString()) {
      this.router.navigateByUrl('home');
    }


    this.passengersService.getPassengersByUserId(currentUser.login, 1)
      .subscribe((data: any[]) => {
        this.passengers = data;
      });

    console.log(this.passengers)

    // this.passengers.forEach(passenger => {
    //
    //   this.passportsService.getPassportsByParentId(passenger.objectId)
    //     .subscribe((data: BaseEntityModel) => {
    //
    //       this.passports.push(data);
    //     });
    // });
  }


  onSubmit() {
    console.log(this.newPassenger);
  }

}




