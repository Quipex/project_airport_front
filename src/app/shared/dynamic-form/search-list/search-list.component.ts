import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ListItemModel} from './item.model';

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.scss']
})
export class SearchListComponent implements OnInit {

  @Input() items: ListItemModel[];
  @Output() itemEmitter = new EventEmitter<ListItemModel>();
  filterString: string;
  @Input() selectorPlaceholder = 'Select';
  @Input() searchPlaceholder = 'Search';

  constructor() { }

  ngOnInit() {
  }

  emitSelection(value: any) {
    this.itemEmitter.emit(value);
  }
}
