import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Response} from '@angular/http';
import {UsersModel} from '../shared/models/users.model';
import {UsersService} from '../shared/services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: [
    './users.component.css'
  ],
  providers: [UsersService]
})
export class UsersComponent implements OnInit {

  @ViewChild('form') form: NgForm;

  users: UsersModel[] = [];
  currentUser: UsersModel;
  showNew: Boolean = false;
  editMode: Boolean = false;
  submitType = 'Save';
  selectedRow: number;
  paging = false;
  countOfPages: number;
  numberOfPage = 0;


  constructor(
    private usersService: UsersService,
  ) {}

  ngOnInit(): void {
    this.usersService
      .getAllUsers()
      .subscribe((responce: Response) => {
        const data = responce.json();
        this.users = data;
        if (data.length > 10) {
          this.paging = true;
          this.countOfPages = Math.ceil(data.length/10);
          this.getTenUsers(1, true);
        }
      });

  }

  private getTenUsers(numberOfPage: number, direction: boolean) {
    this.usersService.getTenUsers(numberOfPage)
      .subscribe((responce: Response) => {
        this.users = responce.json();
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
    this.currentUser = this.users[index];

    this.users.splice(index, 1);

    this.usersService.deleteUser(this.currentUser.id)
      .subscribe((responce: Response) => {
        const data = responce.json();
      });

  }

  onEdit(index: number) {
    console.log(index)
    this.selectedRow = index;
    console.log(this.users[this.selectedRow].id)

    this.currentUser = Object.assign({}, this.users[this.selectedRow]);

    this.submitType = 'Update';

    this.editMode = true;

    this.showNew = true;


  }

  onNew() {

    this.currentUser = new UsersModel();

    this.submitType = 'Save';

    this.showNew = !this.showNew;

    this.editMode = false;

  }

  onSave() {

    if (this.submitType === 'Save') {

      let formObject = JSON.stringify(this.form.value);
      let formValue = JSON.parse(formObject);
      this.currentUser.firstName = formValue.firstName;
      this.currentUser.lastName = formValue.lastName;
      this.currentUser.email = formValue.email;
      this.currentUser.country = formValue.country;

      this.showNew = false;
      this.form.reset();

      this.usersService.addUser(this.currentUser)
        .subscribe((responce: Response) => {
          const data = responce.json();
          if (this.numberOfPage === this.countOfPages) {
            this.users.push(data);
          }
      });

    } else {

      this.usersService.editUser(this.currentUser.id, this.currentUser)
        .subscribe((responce: Response) => {
          const data = responce.json();
          console.log(data);
          this.users[this.selectedRow] = data;
        });
    }
    this.showNew = false;

  }

  onCancel() {
    this.showNew = false;
    this.form.reset();
  }

}
