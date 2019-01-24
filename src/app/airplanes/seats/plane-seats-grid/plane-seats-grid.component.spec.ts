import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PlaneSeatsGridComponent} from './plane-seats-grid.component';

describe('PlaneSeatsGridComponent', () => {
  let component: PlaneSeatsGridComponent;
  let fixture: ComponentFixture<PlaneSeatsGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaneSeatsGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaneSeatsGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
