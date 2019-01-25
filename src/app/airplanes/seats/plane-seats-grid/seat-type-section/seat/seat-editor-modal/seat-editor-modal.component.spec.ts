import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SeatEditorModalComponent} from './seat-editor-modal.component';

describe('SeatEditorModalComponent', () => {
  let component: SeatEditorModalComponent;
  let fixture: ComponentFixture<SeatEditorModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeatEditorModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeatEditorModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
