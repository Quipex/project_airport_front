import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PlaneSeatsEditorComponent} from './plane-seats-editor.component';

describe('PlaneSeatsEditorComponent', () => {
  let component: PlaneSeatsEditorComponent;
  let fixture: ComponentFixture<PlaneSeatsEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaneSeatsEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaneSeatsEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
