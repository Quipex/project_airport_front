import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FlightInfoCardComponent} from './flight-info-card.component';

describe('FlightInfoCardComponent', () => {
  let component: FlightInfoCardComponent;
  let fixture: ComponentFixture<FlightInfoCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlightInfoCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightInfoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
