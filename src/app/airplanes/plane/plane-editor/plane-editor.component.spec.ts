import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PlaneEditorComponent} from './plane-editor.component';

describe('PlaneEditorComponent', () => {
  let component: PlaneEditorComponent;
  let fixture: ComponentFixture<PlaneEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaneEditorComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaneEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
