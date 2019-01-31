import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Listable} from './item.model';

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.scss']
})
export class SearchListComponent implements OnInit {

  @Input() items: Listable[] = [];
  @Output() itemEmitter = new EventEmitter<Listable>();
  @Input() selectorPlaceholder = 'Select';
  @Input() searchPlaceholder = 'Search';
  filterString = '';

  selectorForm = new FormGroup({
    selected: new FormControl('', [
      Validators.required
    ])
  });

  constructor() {
  }

  ngOnInit() {
  }

  emitSelection(value: any) {
    // console.log(value);
    this.itemEmitter.emit(value);
  }

  logChange($event: any) {
    console.log($event);
  }
}
