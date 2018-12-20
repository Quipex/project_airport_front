import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ColumnSetting} from "../shared/models/columnSetting.model";
import {InputBaseModel} from "../shared/models/inputBase.model";
import {BaseService} from '../shared/services/baseService.service';
import {CountriesService} from '../shared/services/countries.service';

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
    public fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      'name': [null, [Validators.required]]
    });
  }

  // private getTenCountries(numberOfPage: number, direction: boolean) {
  //   this.countriesService.getTenCountries(numberOfPage)
  //     .subscribe((data: UsersModel[]) => {
  //       this.countries = data;
  //     });
  //   if (direction) {
  //     if (this.numberOfPage !== this.countOfPages) {
  //       this.numberOfPage++;
  //     }
  //   }  else {
  //     if (this.numberOfPage !== 1) {
  //       this.numberOfPage--;
  //     }
  //   }
  // }
  //
  // onDelete(index: number) {
  //   this.currentCountry = this.countries[index];
  //   this.countries.splice(index, 1);
  //   this.countriesService.deleteCountry(this.currentCountry.id)
  //     .subscribe(() => {
  //       const message = 'Country has been deleted.';
  //       this.showInfo(message);
  //     });
  // }
  //
  // onEdit(index: number) {
  //   this.selectedRow = index;
  //   this.currentCountry = Object.assign({}, this.countries[this.selectedRow]);
  //   this.submitType = 'Update';
  //   this.editMode = true;
  //   this.showNew = true;
  //   this.form = this.fb.group({
  //     'name': [null, [Validators.required]]
  //   });
  // }
  //
  // onNew() {
  //   this.currentCountry = new CountriesModel();
  //   this.submitType = 'Save';
  //   this.showNew = !this.showNew;
  //   this.editMode = false;
  //   this.form = this.fb.group({
  //     'name': [null, [Validators.required]]
  //   });
  // }
  //
  // onSave() {
  //   if (this.submitType === 'Save') {
  //     const formObject = JSON.stringify(this.form.value);
  //     const formValue = JSON.parse(formObject);
  //     this.currentCountry.name = formValue.name;
  //
  //     this.showNew = false;
  //     this.form.reset();
  //
  //     this.countriesService.addCountry(this.currentCountry)
  //       .subscribe((country: CountriesModel) => {
  //           if (this.numberOfPage === this.countOfPages) {
  //             this.countries.push(country);
  //           }
  //           const message = 'New country has been added.';
  //           this.showInfo(message);
  //         },
  //         err => {
  //           this.responseError = err;
  //           this.showError(this.responseError.error.message);
  //         });
  //
  //   } else {
  //     this.countriesService.editCountry(this.currentCountry.id, this.currentCountry)
  //       .subscribe((country: CountriesModel) => {
  //         this.countries[this.selectedRow] = country;
  //         const message = 'Country has been edited.';
  //         this.showInfo(message);
  //       });
  //   }
  //   this.showNew = false;
  // }
  //
  // onCancel() {
  //   this.showNew = false;
  //   this.form.reset();
  // }
  //
  // showInfo(message: string) {
  //   this.toastr.info(message);
  // }
  //
  // showError(message: string) {
  //   this.toastr.error(message);
  // }

}
