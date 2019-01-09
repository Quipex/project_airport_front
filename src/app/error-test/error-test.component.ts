import {Component, OnInit} from '@angular/core';
import {ErrorTestModel} from "./error-test.model";
import {ErrorTestService} from "../services/error-test.service";

@Component({
  selector: 'app-error-test',
  templateUrl: './error-test.component.html',
  styleUrls: ['./error-test.component.scss']
})
export class ErrorTestComponent implements OnInit {

  errors: ErrorTestModel[];

  constructor(
    private service: ErrorTestService
  ) {
  }

  ngOnInit() {
    this.service.getAll().subscribe(
      (data: ErrorTestModel[]) => {
        this.errors = data
      }
    );
  }

  onClick(err: ErrorTestModel) {
    this.service.invokeItem(err.id);
  }
}
