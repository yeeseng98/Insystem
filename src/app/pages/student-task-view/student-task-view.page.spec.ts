import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentTaskViewPage } from './student-task-view.page';

describe('StudentTaskViewPage', () => {
  let component: StudentTaskViewPage;
  let fixture: ComponentFixture<StudentTaskViewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentTaskViewPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentTaskViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
