import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AirlineSelectorComponent} from './airline-selector.component';

describe('AirlineSelectorComponent', () => {
  let component: AirlineSelectorComponent;
  let fixture: ComponentFixture<AirlineSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AirlineSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AirlineSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
