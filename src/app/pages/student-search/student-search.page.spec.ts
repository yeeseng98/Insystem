import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentSearchPage } from './student-search.page';

describe('StudentSearchPage', () => {
  let component: StudentSearchPage;
  let fixture: ComponentFixture<StudentSearchPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentSearchPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentSearchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
