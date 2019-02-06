import {FormControlService} from '../../services/formControl.service';
import {Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {InputBaseModel} from '../models/inputBase.model';
import {BaseEntityModel} from '../models/baseEntity.model';
import {PassengerPassportCommonModel} from '../models/entity/users/passengers/passengerPassportCommon.model';
import {PassengerPassportModel} from '../models/entity/users/passengers/passengerPasport.model';
import {TicketDTOModel} from '../models/ticketDTO.model';
import {TicketPassengerCommonModel} from '../models/ticketPassengerCommon.model';
import {ChangePasswordModel} from '../models/changePassword.model';
import {AirlinesModel} from "../models/entity/airline/airlines.model";
import {CountriesModel} from "../models/entity/flight/countries.model";

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
      this.questions.forEach((item: InputBaseModel<any>) => {
        if (item.type === 'airline-selector') {
          let airlinesArray: Array<AirlinesModel> = item.value;
          airlinesArray.forEach((airline: AirlinesModel) => {
            if (airline.name === this.form.controls['airline'].value.name) {
              this.form.controls['airline'].setValue(airline);
            }
          });
        } else if (item.type === 'country-selector') {
          let airlinesArray: Array<CountriesModel> = item.value;
          airlinesArray.forEach((country: CountriesModel) => {
            if (country.name === this.form.controls['country'].value.name) {
              this.form.controls['country'].setValue(country.objectId);
            }
          });
        }
      });
    }
  }

  onCancel() {
    this.isCancel.emit(true);
    this.form.reset();
  }

  onSubmit() {
    if (this.editMode) {
      if (this.currentItem instanceof PassengerPassportModel) {
        let editedItem: PassengerPassportCommonModel;
        editedItem = this.form.value;
        this.returnedItem.emit(editedItem);
      } else if (this.currentItem instanceof TicketDTOModel) {
        const editedItem: TicketPassengerCommonModel = this.form.value;
        this.returnedItem.emit(editedItem);
      } else if (this.currentItem instanceof ChangePasswordModel) {
        this.currentItem = this.form.value;
        this.returnedItem.emit(this.currentItem);
      } else {
        const editedItem = JSON.parse(JSON.stringify(this.currentItem));
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
