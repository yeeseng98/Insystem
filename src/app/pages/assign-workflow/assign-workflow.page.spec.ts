import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignWorkflowPage } from './assign-workflow.page';

describe('AssignWorkflowPage', () => {
  let component: AssignWorkflowPage;
  let fixture: ComponentFixture<AssignWorkflowPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignWorkflowPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignWorkflowPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
