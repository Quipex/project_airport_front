import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {InputBaseModel} from '../models/inputBase.model';
import {BaseEntityModel} from '../models/baseEntity.model';

@Component({
  selector: 'app-form-input',
  templateUrl: './dynamic-form-render.component.html'
})
export class DynamicFormRenderComponent implements OnInit{
  @Input() question: InputBaseModel<any>;
  @Input() form: FormGroup;
  @Input() currentItem: BaseEntityModel;
  @Input() editMode: boolean;
  @Input() editedForm: FormGroup;
  get isValid() { return this.form.controls[this.question.key].valid; }

  ngOnInit(): void {
  }

}
