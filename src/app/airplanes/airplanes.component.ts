import {Component} from '@angular/core';
import {BaseService} from "../services/baseService.service";
import {FormGroup} from "@angular/forms";
import {ColumnSetting} from "../shared/models/columnSetting.model";
import {InputBaseModel} from "../shared/models/inputBase.model";
import {AirplanesService} from "../services/airplanes.service";
import {Router} from "@angular/router";
import {AuthorityModel} from "../shared/models/entity/users/authority.model";
import {AuthResponseModel} from "../shared/models/authResponse.model";

@Component({
  selector: 'app-airplanes',
  templateUrl: './airplanes.component.html',
  styleUrls: ['./airplanes.component.scss'],
  providers: [{provide: BaseService, useClass: AirplanesService}]
})
export class AirplanesComponent {

  form: FormGroup;

  settings: ColumnSetting[] =
    [
      {
        primaryKey: 'objectId',
        header: '#'
      },
      {
        primaryKey: 'model',
        header: 'Model',
        sortAttr: 16
      },
      {
        primaryKey: 'airlineId',
        header: 'Airline',
        sortAttr: 17
      }
    ];

  questions: InputBaseModel<any>[] = [

    new InputBaseModel({
      key: 'model',
      label: 'Model',
      required: true,
      type: 'text',
      order: 1,
      edit: true
    }),

    new InputBaseModel({
      key: 'airlineId',
      label: 'Airline',
      required: true,
      type: 'text',
      order: 2,
      edit: true
    })
  ];

  constructor(
    private  router: Router
  ) {
  }

  ngOnInit(): void {
    const authModel: AuthResponseModel = JSON.parse(window.localStorage.getItem('currentUser'));
    if (authModel === null || authModel.authority === null) {
      this.router.navigateByUrl('login');
    } else if (authModel.authority !== AuthorityModel.ROLE_ADMIN.toString()) {
      this.router.navigateByUrl('home');
    }
  }

}
