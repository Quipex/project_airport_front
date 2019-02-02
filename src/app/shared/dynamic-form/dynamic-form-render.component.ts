import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {InputBaseModel} from '../models/inputBase.model';

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

  get isValid() {
    return this.form.controls[this.question.key].valid;
  }

  ngOnInit(): void {
    if (this.question.type === 'select') {
      for (const x in this.question.value) {
        this.selectKeys.push(x);
      }
    }
  }

  test(event: any) {
    console.log(event);
  }

}
