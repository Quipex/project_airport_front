import {Component, OnInit, ViewChild} from '@angular/core';
import {ModalDirective} from "angular-bootstrap-md";
import {InputBaseModel} from "../shared/models/inputBase.model";
import {FormControlService} from "../services/formControl.service";
import {FormGroup} from "@angular/forms";
import {UsersService} from "../services/users.service";
import {UsersModel} from "../shared/models/entity/users/users.model";
import {ToastrService} from "ngx-toastr";
import {ChangePasswordModel} from "../shared/models/changePassword.model";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  editMode = false;
  currentItem: UsersModel = new UsersModel();
  typeOfEdit = true;
  passwordObj: ChangePasswordModel = new ChangePasswordModel();
  editForm: FormGroup;
  passwordForm: FormGroup;
  @ViewChild('editModal') editModal: ModalDirective;
  @ViewChild('changePwdModal') changePwdModal: ModalDirective;

  constructor(
    private fcs: FormControlService,
    private usersService: UsersService,
    private toastr: ToastrService
  ) { }

  editQuestions: InputBaseModel<any>[] = [
    new InputBaseModel({
      key: 'login',
      label: 'Login',
      required: true,
      type: 'text',
      edit: true
    }),

    new InputBaseModel({
      key: 'nickname',
      label: 'Nickname',
      required: true,
      type: 'text',
      edit: true
    }),

    new InputBaseModel({
      key: 'email',
      label: 'Email',
      required: true,
      type: 'email',
      edit: true
    }),

    new InputBaseModel({
      key: 'phoneNumber',
      label: 'Phone number',
      required: true,
      type: 'tel',
      edit: true
    }),
  ];

  passwordQuestions: InputBaseModel<any>[] = [
    new InputBaseModel({
      key: 'oldPassword',
      label: 'Old password',
      required: true,
      type: 'text',
      edit: true
    }),

    new InputBaseModel({
      key: 'newPassword',
      label: 'New Password',
      required: true,
      type: 'text',
      edit: true
    }),

    new InputBaseModel({
      key: 'confirmPassword',
      label: 'Confirm password',
      required: true,
      type: 'text',
      edit: true
    })
  ];

  ngOnInit() {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.usersService.getUserByLogin(currentUser.login)
      .subscribe((data: UsersModel) => {
        this.currentItem = data;
      });
    this.editForm = this.fcs.toFormGroup(this.editQuestions);
    this.passwordForm = this.fcs.toFormGroup(this.passwordQuestions);
  }

  changePassword() {
    this.typeOfEdit = false;
    this.editMode = true;
    this.changePwdModal.show();
  }

  editContactInfo() {
    this.typeOfEdit = true;
    this.editMode = true;
    this.editForm.patchValue(this.currentItem);
    this.editModal.show();
  }

  onCancel(event: boolean) {
    if (event) {
      if (this.typeOfEdit) {
        this.editForm.reset();
        this.editModal.hide();
      }
      else {
        this.passwordForm.reset();
        this.changePwdModal.hide();
      }
    }
  }

  onSave(returnedItem: any) {
    if (this.typeOfEdit) {
      for (const x in this.currentItem) {
        for (const y in returnedItem) {
          if (x === y) {
            this.currentItem[x] = returnedItem[y];
          }
        }
      }
      this.usersService.editItem(0, this.currentItem)
        .subscribe((data: UsersModel) => {
          this.editModal.hide();
          const message = 'The item has been edited.';
          this.showInfo(message);
        });
    } else {
      let pwdModel = <ChangePasswordModel>returnedItem;
      if (pwdModel.newPassword !== pwdModel.confirmPassword) {
        const message = 'Passwords are not equals.';
        this.showError(message);
      } else {
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.usersService.changePassword(currentUser.login, returnedItem)
          .subscribe((data: boolean) => {
            if (data) {
              this.changePwdModal.hide();
              const message = 'The password has been changed.';
              this.showInfo(message);
            } else {
              const message = 'Wrong old password.';
              this.showError(message);
            }
          });
      }
    }
  }

  showInfo(message: string) {
    this.toastr.info(message);
  }

  showError(message: string) {
    this.toastr.error(message);
  }

}
