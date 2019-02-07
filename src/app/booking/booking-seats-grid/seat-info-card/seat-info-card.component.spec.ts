import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SeatInfoCardComponent} from './seat-info-card.component';

describe('SeatInfoCardComponent', () => {
  let component: SeatInfoCardComponent;
  let fixture: ComponentFixture<SeatInfoCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeatInfoCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeatInfoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
