import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ListItemModel} from './item.model';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material';

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.scss']
})
export class SearchListComponent implements OnInit {

  @Input() items: ListItemModel[] = [];
  @Output() itemEmitter = new EventEmitter<ListItemModel>();
  @Input() selectorPlaceholder = 'Select';
  @Input() searchPlaceholder = 'Search';
  filterString = '';
  selected = new FormControl('valid', [
    Validators.required
  ]);

  constructor() {
  }

  ngOnInit() {
  }

  emitSelection(value: any) {
    this.itemEmitter.emit(value);
  }
}

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
