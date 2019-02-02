import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {InputBaseModel} from '../models/inputBase.model';
import {AirportModel} from "../models/entity/flight/airport.model";

@Component({
  selector: 'app-form-input',
  templateUrl: './dynamic-form-render.component.html',
  styleUrls: ['./dynamic-form-render.component.scss'],
})
export class DynamicFormRenderComponent implements OnInit {

  @Input() question: InputBaseModel<any>;
  @Input() form: FormGroup;
  @Input() editMode: boolean;

  selectKeys = [];
  defaultValue = {};

  get isValid() {
    return this.form.controls[this.question.key].valid;
  }

  ngOnInit(): void {

    if (this.question.type === 'select') {
      for (const x in this.question.value) {
        this.selectKeys.push(x);
      }
    }
    if (this.editMode) {
      if (this.question.type === 'airport-selector') {
        this.defaultValue = this.question.value[0];
      }
    }
    if (this.question.type === 'status-selector') {
      console.log(this.question.value)
    }
  }

  test(event: any) {
    console.log(event);
  }

}
