import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateWorkflowPage } from './create-workflow.page';

describe('CreateWorkflowPage', () => {
  let component: CreateWorkflowPage;
  let fixture: ComponentFixture<CreateWorkflowPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateWorkflowPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateWorkflowPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
