import {Component, Input, OnInit} from '@angular/core';
import {SectionModel} from '../../../../seats/plane-seats-grid/seat-type-section/section-model';

@Component({
  selector: 'app-section-editor',
  templateUrl: './section-editor.component.html',
  styleUrls: ['./section-editor.component.scss']
})
export class SectionEditorComponent implements OnInit {

  @Input() section: SectionModel;
  // @Output() sectionChange = new EventEmitter<SectionModel>();
  private tempRows: number;
  private tempCols: number;
  private tempModifier: number;
  private tempDescr: string;

  constructor() {
  }

  ngOnInit() {
    this.tempCols = this.section.cols;
    this.tempRows = this.section.rows;
    this.tempModifier = this.section.seatType.modifier;
    this.tempDescr = this.section.seatType.description;
  }

  confirm(section: SectionModel) {
    section.rows = this.tempRows;
    section.cols = this.tempCols;
    section.seatType.modifier = this.tempModifier;
    section.seatType.description = this.tempDescr;
  }

  changeCols(newValue) {
    if (newValue === '') {
      newValue = 0;
    }
    this.tempCols = newValue;
  }

  changeRows(newValue) {
    console.log(newValue);
    if (newValue === '') {
      newValue = 0;
    }
    this.tempRows = newValue;
  }

  changeModifier(newValue) {
    if (newValue === '') {
      newValue = 1;
    }
    this.tempModifier = newValue;
  }

  changeDescription(newValue) {
    this.tempDescr = newValue;
  }
}
