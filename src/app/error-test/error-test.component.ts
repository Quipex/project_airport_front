import {Component, OnInit} from '@angular/core';
import {ErrorTestModel} from "./error-test.model";
import {ErrorTestService} from "../services/error-test.service";

@Component({
  selector: 'app-error-test',
  templateUrl: './error-test.component.html',
  styleUrls: ['./error-test.component.scss']
})
export class ErrorTestComponent implements OnInit {

  errors = [];

  constructor(
    private service: ErrorTestService
  ) {
  }

  ngOnInit() {
    this.service.getAll().subscribe(
      (data: object) => {
        for (let dataKey in data) {
          this.errors.push(new ErrorTestModel(+dataKey, data[dataKey]));
        }
      }
    );
  }

  onClick(err: ErrorTestModel) {
    this.service.invokeItem(err.id).subscribe();
    console.log(err);
  }
}
