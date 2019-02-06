import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {InputBaseModel} from '../models/inputBase.model';
import {AirlinesModel} from "../models/entity/airline/airlines.model";

@Component({
  selector: 'app-form-input',
  templateUrl: './dynamic-form-render.component.html',
  styleUrls: ['./dynamic-form-render.component.scss'],
})
export class DynamicFormRenderComponent implements OnInit {

  @Input() question: InputBaseModel<any>;
  @Input() form: FormGroup;
  @Input() editMode: boolean;
  @Output() itemId = new EventEmitter<number>();

  selectKeys = [];

  get isValid() {
    return this.form.controls[this.question.key].valid;
  }

  ngOnInit(): void {
    if (this.question.type === 'select') {
      for (let x in this.question.value) {
        this.selectKeys.push(x);
      }
    }
  }

  asAirline(val) : AirlinesModel { return val; }

  static test(event: any) {
    console.log(event);
  }

  itemChange(index: number) {
    let id = this.question.value[index].objectId;
    this.itemId.emit(id);
  }
}
