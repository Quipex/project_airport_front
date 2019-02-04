import {Component, Input, OnInit} from '@angular/core';
import {SeatModel} from '../../../../../../shared/models/entity/airplane/seat.model';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {RegexValidator} from '../../../../../../shared/validator/input-regex-validator';

@Component({
  selector: 'app-seat-editor-modal',
  templateUrl: './seat-editor-modal.component.html',
  styleUrls: ['./seat-editor-modal.component.scss']
})
export class SeatEditorModalComponent implements OnInit {

  @Input() seat: SeatModel;
  private tempModifier: number;
  title = 'Edit seat';

  constructor(public activeModal: NgbActiveModal) {
  }

  ngOnInit() {
    this.tempModifier = this.seat.modifier;
  }

  changeModifier(newVal: any) {
    if (!RegexValidator.isFloat(newVal)) {
      // console.log('it is not a float number, so setting to 1');
      newVal = 1;
    }
    this.tempModifier = +newVal;
  }

  confirm() {
    this.seat.modifier = this.tempModifier;
    this.activeModal.close();
  }


}
