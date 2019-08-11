import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowTablePage } from './workflow-table.page';

describe('WorkflowTablePage', () => {
  let component: WorkflowTablePage;
  let fixture: ComponentFixture<WorkflowTablePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkflowTablePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkflowTablePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
