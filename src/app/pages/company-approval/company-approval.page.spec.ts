import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyApprovalPage } from './company-approval.page';

describe('CompanyApprovalPage', () => {
  let component: CompanyApprovalPage;
  let fixture: ComponentFixture<CompanyApprovalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyApprovalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyApprovalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
