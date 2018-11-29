import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {UsersModel} from '../shared/models/users.model';
import {UsersService} from '../shared/services/users.service';
import {Router} from '@angular/router';
import {AuthorityModel} from '../shared/models/authority.model';
import {and} from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: [
    './users.component.scss'
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
  countOfPages: number = 0;
  numberOfPage = 0;
  filterItems = [
    {title: 'Sign-up users', checked: false},
    {title: 'Spec users', checked: false},
  ];
  searchValue: string;


  constructor(
    private usersService: UsersService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const user: UsersModel = JSON.parse(window.localStorage.getItem('currentUser'));
    if (user !== null && user.authority === 'ROLE_ADMIN') {
      this.router.navigate(['/users']);
    } else if (user !== null && user.email !== 'admin@admin.com') {
      this.router.navigate(['/home']);
    }
    this.usersService
      .getAllUsers()
      .subscribe((data: UsersModel[]) => {
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
      .subscribe((data: UsersModel[]) => {
        this.users = data;
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
      .subscribe(() => {

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

      const authority: AuthorityModel = new AuthorityModel('ROLE_USER', 2);
      let formObject = JSON.stringify(this.form.value);
      let formValue = JSON.parse(formObject);
      this.currentUser.firstname = formValue.firstname;
      this.currentUser.lastname = formValue.lastname;
      this.currentUser.email = formValue.email;
      this.currentUser.password = formValue.password;
      this.currentUser.phonenumber = formValue.phonenumber;
      this.currentUser.authority = authority;
      this.currentUser.enabled = 'true';

      this.showNew = false;
      this.form.reset();

      this.usersService.addUser(this.currentUser)
        .subscribe((user: UsersModel) => {
          console.log(this.numberOfPage+ ' ' +this.countOfPages);
          if (this.numberOfPage === this.countOfPages) {
            this.users.push(user);
          }
        });

    } else {

      const authority: AuthorityModel = new AuthorityModel('ROLE_USER', 2);
      this.currentUser.authority = authority;
      this.currentUser.enabled = 'true';
      this.usersService.editUser(this.currentUser.id, this.currentUser)
        .subscribe((user: UsersModel) => {
          this.users[this.selectedRow] = user;
        });
    }
    this.showNew = false;

  }

  onCancel() {
    this.showNew = false;
    this.form.reset();
  }

  private deselectAll(arr: any[]) {
    arr.forEach(val => {
      if (val.checked) {
        val.checked = false;
      }
    });
  }

  checkBoxClick(item: any) {

    let selected = item.checked;

    this.deselectAll(this.filterItems);

    item.checked = !selected;
    console.log(this.filterItems);
  }

  public onSearch() {
    let searchArray;
    if (this.filterItems[0].checked === true) {
      searchArray = [
        {
          'authority':
            {
              'name': 'ROLE_USER'
            }
        },
        {
          'lastname': this.searchValue

        }
      ];
    } else if (this.filterItems[1].checked === true) {
      searchArray = [
        {
          'authority':
            {
              'name': 'ROLE_ADMIN'
            }
        },
        {
          'lastname': this.searchValue

        }
      ];
    } else if (this.filterItems[0].checked === false && this.filterItems[1].checked === false) {
      searchArray = [
        {
          'lastname': this.searchValue
        }
      ];
    }
    this.usersService.getTenUsersWithSearch(searchArray, 1)
      .subscribe((data: UsersModel[]) => {
        this.users = data;
        console.log(data);
      });

  }

}
