import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowSelectionPage } from './workflow-selection.page';

describe('WorkflowSelectionPage', () => {
  let component: WorkflowSelectionPage;
  let fixture: ComponentFixture<WorkflowSelectionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkflowSelectionPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkflowSelectionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
