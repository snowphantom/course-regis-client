import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewcourseFormComponent } from './newcourse-form.component';

describe('NewcourseFormComponent', () => {
  let component: NewcourseFormComponent;
  let fixture: ComponentFixture<NewcourseFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewcourseFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewcourseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
