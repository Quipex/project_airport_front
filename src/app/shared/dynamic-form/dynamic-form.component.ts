import {FormControlService} from '../services/formControl.service';
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {InputBaseModel} from '../models/inputBase.model';
import {BaseEntityModel} from '../models/baseEntity.model';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  providers: [ FormControlService ]
})
export class DynamicFormComponent implements OnInit {

  @Input() questions: InputBaseModel<any>[] = [];
  @Input() submitType: string;
  @Input() editMode: boolean;
  @Input() editedForm: FormGroup;
  @Input() currentItem: BaseEntityModel;
  @Output() isCancel = new EventEmitter<boolean>();
  @Output() returnedItem = new EventEmitter<BaseEntityModel>();
  form: FormGroup;

  constructor(private fcs: FormControlService) {  }

  ngOnInit() {
    this.form = this.fcs.toFormGroup(this.questions);
    if (this.editedForm) {
      this.form = this.editedForm;
    }
  }

  onCancel() {
    this.isCancel.emit(true);
    this.form.reset();
  }

  onSubmit() {
    if (this.editMode) {
      const formData = this.form.value;
      for (const x in this.currentItem) {
        for (const y in formData) {
          if (x === y) {
            this.currentItem[x] = formData[y];
          }
        }
      }
      this.returnedItem.emit(this.currentItem);
    } else {
      const newItem: BaseEntityModel = new BaseEntityModel();
      const formData = this.form.value;
      for (const x in formData) {
        newItem[x] = formData[x];
      }
      this.returnedItem.emit(newItem);
    }
  }
}
