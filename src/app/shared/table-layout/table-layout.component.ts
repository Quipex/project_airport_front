import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {ColumnSetting} from '../models/columnSetting.model';
import {Router} from "@angular/router";
import {AirplanesModel} from "../models/entity/airplane/airplanes.model";

@Component({
  selector: 'app-table-layout',
  templateUrl: './table-layout.component.html',
  styleUrls: ['./table-layout.component.scss']
})
export class TableLayoutComponent implements OnChanges, OnInit {

  @Input() records: any[];
  @Input() caption: string;
  @Input() settings: ColumnSetting[];
  @Input() clickable: boolean;
  @Output() deletedId = new EventEmitter<number>();
  @Output() editedId = new EventEmitter<number>();
  @Output() columnAttr = new EventEmitter<number>();
  columnMaps: ColumnSetting[];
  sortedDirections = Array();

  constructor(
    private router: Router
  ) {
  }

  ngOnChanges() {
    this.columnMaps = this.settings;
  }

  ngOnInit(): void {
    for (let i = 0; i < this.settings.length; i++) {
      if (this.settings[i].sortAttr !== undefined) {
        this.sortedDirections[i] = 0;
      }
    }
  }

  onEdit(id: number) {
    this.editedId.emit(id);
  }

  onDelete(id: number) {
    this.deletedId.emit(id);
  }

  sortBy(columnAttr: number, index: number) {
    this.columnAttr.emit(columnAttr);
    if (this.sortedDirections[index] === 0) {
      this.sortedDirections[index] = 1;
    } else {
      if (this.sortedDirections[index] === 1) {
        this.sortedDirections[index] = -1;
      } else if (this.sortedDirections[index] === -1) {
        this.sortedDirections[index] = 0;
      }
    }
  }

  redirect(index: number) {
    let item = this.records[index];
    this.router.navigate(['airplane-info', {airplaneId: item.objectId }]);
  }

}
