import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PlaneSeatsParametersComponent} from './plane-seats-parameters.component';

describe('PlaneSeatsParametersComponent', () => {
  let component: PlaneSeatsParametersComponent;
  let fixture: ComponentFixture<PlaneSeatsParametersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaneSeatsParametersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaneSeatsParametersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
