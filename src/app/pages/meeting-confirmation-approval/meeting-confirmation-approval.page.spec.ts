import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingConfirmationApprovalPage } from './meeting-confirmation-approval.page';

describe('MeetingConfirmationApprovalPage', () => {
  let component: MeetingConfirmationApprovalPage;
  let fixture: ComponentFixture<MeetingConfirmationApprovalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeetingConfirmationApprovalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetingConfirmationApprovalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
