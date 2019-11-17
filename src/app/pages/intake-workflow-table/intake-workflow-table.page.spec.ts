import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntakeWorkflowTablePage } from './intake-workflow-table.page';

describe('IntakeWorkflowTablePage', () => {
  let component: IntakeWorkflowTablePage;
  let fixture: ComponentFixture<IntakeWorkflowTablePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntakeWorkflowTablePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntakeWorkflowTablePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
