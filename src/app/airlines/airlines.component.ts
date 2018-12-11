import { Component, OnInit } from '@angular/core';
import {ResponceErrorModel} from '../shared/models/responceError.model';
import {UsersModel} from '../shared/models/users.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UsersService} from '../shared/services/users.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {AirlinesModel} from '../shared/models/airlines.model';
import {AuthorityModel} from '../shared/models/authority.model';

@Component({
  selector: 'app-airlines',
  templateUrl: './airlines.component.html',
  styleUrls: ['./airlines.component.scss']
})
export class AirlinesComponent implements OnInit {

  form: FormGroup;
  airlines: AirlinesModel[] = [];
  currentAirline: AirlinesModel;
  showNew: Boolean = false;
  editMode: Boolean = false;
  submitType = 'Save';
  selectedRow: number;
  paging = false;
  countOfPages: number = 0;
  numberOfPage = 0;
  // filterItems = [
  //   {title: 'Sign-up users', checked: false},
  //   {title: 'Spec users', checked: false},
  // ];
  searchValue: string;
  deleteId = 0;
  orderOfSort = true;
  responceError: ResponceErrorModel;

  constructor(
    private airlinesService: AirlinesService,
    private router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    const user: UsersModel = JSON.parse(window.localStorage.getItem('currentUser'));
    if (user !== null || user.authority !== 'ROLE_ADMIN') {
      this.router.navigate(['/home']);
    }
    this.airlinesService
      .getCountOfAirlines()
      .subscribe((data: number) => {
        if (data > 10) {
          this.paging = true;
          this.countOfPages = Math.ceil(data/10);
        }
        this.getTenAirlines(1, true);
      });

    this.form = this.fb.group({
      'name': [null, [Validators.required]],
      'description': [null, [Validators.required]],
      'email': [null, [Validators.required, Validators.email]],
      'phonenumber': [null, [Validators.required]]
    });
  }

  private getTenAirlines(numberOfPage: number, direction: boolean) {
    this.airlinesService.getTenAirlines(numberOfPage)
      .subscribe((data: UsersModel[]) => {
        this.airlines = data;
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
    this.currentAirline = this.airlines[index];
    this.airlines.splice(index, 1);
    this.airlinesService.deleteAirline(this.currentAirline.id)
      .subscribe(() => {
        const message = 'The airline has been deleted.';
        this.showInfo(message);
      });
  }

  onEdit(index: number) {
    this.selectedRow = index;
    this.currentAirline = Object.assign({}, this.airlines[this.selectedRow]);
    this.submitType = 'Update';
    this.editMode = true;
    this.showNew = true;
    this.form = this.fb.group({
      'name': [null, [Validators.required]],
      'description': [null, [Validators.required]],
      'email': [null, [Validators.required, Validators.email]],
      'phonenumber': [null, [Validators.required]]
    });
  }

  onNew() {
    this.currentAirline = new AirlinesModel();
    this.submitType = 'Save';
    this.showNew = !this.showNew;
    this.editMode = false;
    this.form = this.fb.group({
      'name': [null, [Validators.required]],
      'description': [null, [Validators.required]],
      'email': [null, [Validators.required, Validators.email]],
      'phonenumber': [null, [Validators.required]]
    });
  }

  onSave() {
    if (this.submitType === 'Save') {
      let formObject = JSON.stringify(this.form.value);
      let formValue = JSON.parse(formObject);
      this.currentAirline.name = formValue.name;
      this.currentAirline.descr = formValue.descr;
      this.currentAirline.email = formValue.email;
      this.currentAirline.phonenumber = formValue.phonenumber;

      this.showNew = false;
      this.form.reset();

      this.airlinesService.addAirline(this.currentAirline)
        .subscribe((airline: AirlinesModel) => {
            if (this.numberOfPage === this.countOfPages) {
              this.airlines.push(airline);
            }
            const message = 'New airline has been added.';
            this.showInfo(message);
          },
          err => {
            this.responceError = err;
            this.showError(this.responceError.error.message);
          });

    } else {
      this.airlinesService.editAirline(this.currentAirline.id, this.currentAirline)
        .subscribe((airline: AirlinesModel) => {
          this.airlines[this.selectedRow] = airline;
          const message = 'The airline has been edited.';
          this.showInfo(message);
        });
    }
    this.showNew = false;
  }

  onCancel() {
    this.showNew = false;
    this.form.reset();
  }

  sortBy(field: string, order: boolean) {
    this.airlinesService.sortAirlinesBy(field, order)
      .subscribe((data: AirlinesModel[]) => {
        this.airlines = data;
        this.orderOfSort = !this.orderOfSort;
      });
  }

  showInfo(message: string) {
    this.toastr.info(message);
  }

  showError(message: string) {
    this.toastr.error(message);
  }

}
