import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntakeWorkflowViewPage } from './intake-workflow-view.page';

describe('IntakeWorkflowViewPage', () => {
  let component: IntakeWorkflowViewPage;
  let fixture: ComponentFixture<IntakeWorkflowViewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntakeWorkflowViewPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntakeWorkflowViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
