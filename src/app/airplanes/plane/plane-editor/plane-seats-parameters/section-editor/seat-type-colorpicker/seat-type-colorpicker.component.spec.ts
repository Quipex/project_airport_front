import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SeatTypeColorpickerComponent} from './seat-type-colorpicker.component';

describe('SeatTypeColorpickerComponent', () => {
  let component: SeatTypeColorpickerComponent;
  let fixture: ComponentFixture<SeatTypeColorpickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeatTypeColorpickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeatTypeColorpickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
