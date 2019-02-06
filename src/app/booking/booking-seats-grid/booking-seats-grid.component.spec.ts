import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {BookingSeatsGridComponent} from './booking-seats-grid.component';

describe('BookingSeatsGridComponent', () => {
  let component: BookingSeatsGridComponent;
  let fixture: ComponentFixture<BookingSeatsGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingSeatsGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingSeatsGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
