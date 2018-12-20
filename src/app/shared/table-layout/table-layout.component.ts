import {Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';
import {ColumnSetting} from '../models/columnSetting.model';

@Component({
  selector: 'app-table-layout',
  templateUrl: './table-layout.component.html',
  styleUrls: ['./table-layout.component.scss']
})
export class TableLayoutComponent implements OnChanges {

  @Input() records: any[];
  @Input() caption: string;
  @Input() settings: ColumnSetting[];
  @Output() deletedId = new EventEmitter<number>();
  @Output() editedId = new EventEmitter<number>();
  columnMaps: ColumnSetting[];

  constructor() { }

  ngOnChanges() {
    this.columnMaps = this.settings;
  }

  onEdit(id: number) {
    this.editedId.emit(id);
  }

  onDelete(id: number) {
    this.deletedId.emit(id);
  }

}
