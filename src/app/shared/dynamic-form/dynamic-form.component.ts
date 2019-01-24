import {FormControlService} from '../../services/formControl.service';
import {Component, ElementRef, EventEmitter, Input, OnChanges, Output} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {InputBaseModel} from '../models/inputBase.model';
import {BaseEntityModel} from '../models/baseEntity.model';
import {PassengerPassportCommonModel} from "../models/entity/users/passengers/passengerPassportCommon.model";
import {PassengerPassportModel} from "../models/entity/users/passengers/passengerPasport.model";
import {TicketDTOModel} from "../models/ticketDTO.model";
import {TicketPassengerCommonModel} from "../models/ticketPassengerCommon.model";
import {ChangePasswordModel} from "../models/changePassword.model";

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  providers: [FormControlService]
})
export class DynamicFormComponent implements OnChanges {

  @Input() questions: InputBaseModel<any>[] = [];
  @Input() submitType: string;
  @Input() editMode: boolean;
  @Input() editedForm: FormGroup;
  @Input() currentItem: BaseEntityModel;
  @Output() isCancel = new EventEmitter<boolean>();
  @Output() returnedItem = new EventEmitter<BaseEntityModel>();
  form: FormGroup;

  constructor(private fcs: FormControlService) {
  }

  ngOnChanges() {
    this.form = this.fcs.toFormGroup(this.questions);
    if (this.editMode) {
      this.form = this.editedForm;
    }
  }

  onCancel() {
    this.isCancel.emit(true);
    this.form.reset();
  }

  onSubmit() {
    if (this.editMode) {
      if (this.currentItem instanceof PassengerPassportModel) {
        let editedItem = new PassengerPassportCommonModel();
        const formData = this.form.value;
        editedItem = formData;
        this.returnedItem.emit(editedItem);
      } else if (this.currentItem instanceof TicketDTOModel) {
        let editedItem = new TicketPassengerCommonModel();
        const formData = this.form.value;
        editedItem = formData;
        this.returnedItem.emit(editedItem);
      } else if (this.currentItem instanceof ChangePasswordModel) {
        this.currentItem = this.form.value;
        this.returnedItem.emit(this.currentItem);
      } else {
        let editedItem = JSON.parse(JSON.stringify(this.currentItem));
        const formData = this.form.value;
        for (const x in editedItem) {
          for (const y in formData) {
            if (x === y) {
              if (y === 'phoneNumber') {
                editedItem[x] = formData['phoneNumber'].internationalNumber;
              } else {
                editedItem[x] = formData[y];
              }
            }
          }
        }
        this.returnedItem.emit(editedItem);
      }
    } else {
      const newItem: BaseEntityModel = new BaseEntityModel();
      const formData = this.form.value;
      for (const x in formData) {
        if (x === 'phoneNumber') {
          newItem[x] = formData['phoneNumber'].internationalNumber;
        } else {
          newItem[x] = formData[x];
        }
      }
      this.returnedItem.emit(newItem);
      this.form.reset();
    }
  }

}
