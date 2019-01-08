import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {ColumnSetting} from "../shared/models/columnSetting.model";
import {InputBaseModel} from "../shared/models/inputBase.model";
import {BaseService} from '../services/baseService.service';
import {CountriesService} from '../services/countries.service';
import {Router} from "@angular/router";
import {AuthorityModel} from "../shared/models/entity/users/authority.model";
import {AuthResponseModel} from "../shared/models/authResponse.model";

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss'],
  providers: [{provide: BaseService, useClass: CountriesService}]
})
export class CountriesComponent implements OnInit {
  form: FormGroup;

  settings: ColumnSetting[] =
    [
      {
        primaryKey: 'id',
        header: '#'
      },
      {
        primaryKey: 'name',
        header: 'Name'
      }
    ];

  questions: InputBaseModel<any>[] = [
    new InputBaseModel({
      key: 'name',
      label: 'Name',
      required: true,
      type: 'text',
      order: 1,
      edit: true
    })
  ];

  constructor(
    private  router: Router
  ) {
  }

  ngOnInit(): void {
    const currentUser: AuthResponseModel = JSON.parse(window.localStorage.getItem('currentUser'));
    if (currentUser === null || currentUser.authority === null) {
      this.router.navigateByUrl('login');
    } else if (currentUser.authority !== AuthorityModel.ROLE_ADMIN.toString()) {
      this.router.navigateByUrl('home');
    }
  }

}
