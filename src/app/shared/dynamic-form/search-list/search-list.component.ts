import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material';
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
    console.log(value);
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
