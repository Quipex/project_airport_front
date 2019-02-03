import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {ColumnSetting} from '../models/columnSetting.model';
import {Router} from '@angular/router';

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
  @Input() currentPage: number;
  @Output() deletedId = new EventEmitter<number>();
  @Output() editedId = new EventEmitter<number>();
  @Output() columnAttr = new EventEmitter<number>();
  columnMaps: ColumnSetting[];
  sortedDirections = Array();
  countOfItems = 0;

  constructor(
    private router: Router
  ) {
  }

  ngOnChanges() {
    this.columnMaps = this.settings;
    if (this.records) {
      this.countOfItems = this.records.length;
    }
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
    const item = this.records[index];
    this.router.navigate(['airplane-info', {airplaneId: item.objectId}]);
  }

  getParameterOfPath(object: Object, pathToParameter: string) {
    const pathParts = pathToParameter.split('.');
    let parsedObject = object;
    for (const part of pathParts) {
      parsedObject = parsedObject[part];
    }
    return parsedObject;
  }
}
