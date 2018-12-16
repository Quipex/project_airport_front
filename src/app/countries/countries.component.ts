import { Component, OnInit } from '@angular/core';
import {ResponseErrorModel} from '../shared/models/responseError.model';
import {UsersModel} from '../shared/models/users.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {CountriesModel} from '../shared/models/countries.model';
import {CountriesService} from '../shared/services/countries.service';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss']
})
export class CountriesComponent implements OnInit {

  form: FormGroup;
  countries: CountriesModel[] = [];
  currentCountry: CountriesModel;
  showNew: Boolean = false;
  editMode: Boolean = false;
  submitType = 'Save';
  selectedRow: number;
  paging = false;
  countOfPages = 0;
  numberOfPage = 0;
  searchValue: string;
  deleteId = 0;
  orderOfSort = true;
  responseError: ResponseErrorModel;

  constructor(
    private countriesService: CountriesService,
    private router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    const user: UsersModel = JSON.parse(window.localStorage.getItem('currentUser'));
    if (user !== null && user.authority === 'ROLE_ADMIN') {
      this.router.navigate(['/countries']);
    } else if (user !== null && user.authority !== 'ROLE_ADMIN') {
      this.router.navigate(['/home']);
    }
    this.countriesService
      .getCountOfCountries()
      .subscribe((data: number) => {
        if (data > 10) {
          this.paging = true;
          this.countOfPages = Math.ceil(data / 10);
        }
        this.getTenCountries(1, true);
      });

    this.form = this.fb.group({
      'name': [null, [Validators.required]]
    });
  }

  private getTenCountries(numberOfPage: number, direction: boolean) {
    this.countriesService.getTenCountries(numberOfPage)
      .subscribe((data: UsersModel[]) => {
        this.countries = data;
      });
    if (direction) {
      if (this.numberOfPage !== this.countOfPages) {
        this.numberOfPage++;
      }
    }  else {
      if (this.numberOfPage !== 1) {
        this.numberOfPage--;
      }
    }
  }

  onDelete(index: number) {
    this.currentCountry = this.countries[index];
    this.countries.splice(index, 1);
    this.countriesService.deleteCountry(this.currentCountry.id)
      .subscribe(() => {
        const message = 'Country has been deleted.';
        this.showInfo(message);
      });
  }

  onEdit(index: number) {
    this.selectedRow = index;
    this.currentCountry = Object.assign({}, this.countries[this.selectedRow]);
    this.submitType = 'Update';
    this.editMode = true;
    this.showNew = true;
    this.form = this.fb.group({
      'name': [null, [Validators.required]]
    });
  }

  onNew() {
    this.currentCountry = new CountriesModel();
    this.submitType = 'Save';
    this.showNew = !this.showNew;
    this.editMode = false;
    this.form = this.fb.group({
      'name': [null, [Validators.required]]
    });
  }

  onSave() {
    if (this.submitType === 'Save') {
      const formObject = JSON.stringify(this.form.value);
      const formValue = JSON.parse(formObject);
      this.currentCountry.name = formValue.name;

      this.showNew = false;
      this.form.reset();

      this.countriesService.addCountry(this.currentCountry)
        .subscribe((country: CountriesModel) => {
            if (this.numberOfPage === this.countOfPages) {
              this.countries.push(country);
            }
            const message = 'New country has been added.';
            this.showInfo(message);
          },
          err => {
            this.responseError = err;
            this.showError(this.responseError.error.message);
          });

    } else {
      this.countriesService.editCountry(this.currentCountry.id, this.currentCountry)
        .subscribe((country: CountriesModel) => {
          this.countries[this.selectedRow] = country;
          const message = 'Country has been edited.';
          this.showInfo(message);
        });
    }
    this.showNew = false;
  }

  onCancel() {
    this.showNew = false;
    this.form.reset();
  }

  showInfo(message: string) {
    this.toastr.info(message);
  }

  showError(message: string) {
    this.toastr.error(message);
  }

}
