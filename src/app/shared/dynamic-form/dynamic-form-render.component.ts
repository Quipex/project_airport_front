import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {InputBaseModel} from '../models/inputBase.model';
import {BaseEntityModel} from '../models/baseEntity.model';
import {UsersModel} from '../models/users.model';
import {AirlinesModel} from '../models/airlines.model';

@Component({
  selector: 'app-form-input',
  templateUrl: './dynamic-form-render.component.html'
})
export class DynamicFormQuestionComponent implements OnInit{
  @Input() question: InputBaseModel<any>;
  @Input() form: FormGroup;
  @Input() currentItem: BaseEntityModel;
  @Input() editMode: boolean;
  get isValid() { return this.form.controls[this.question.key].valid; }

  ngOnInit(): void {


  }


}
