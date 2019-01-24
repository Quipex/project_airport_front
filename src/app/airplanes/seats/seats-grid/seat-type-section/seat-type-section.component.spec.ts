import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SeatTypeSectionComponent} from './seat-type-section.component';

describe('SeatTypeSectionComponent', () => {
  let component: SeatTypeSectionComponent;
  let fixture: ComponentFixture<SeatTypeSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeatTypeSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeatTypeSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
