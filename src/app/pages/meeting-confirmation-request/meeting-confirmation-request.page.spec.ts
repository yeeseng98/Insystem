import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingConfirmationRequestPage } from './meeting-confirmation-request.page';

describe('MeetingConfirmationRequestPage', () => {
  let component: MeetingConfirmationRequestPage;
  let fixture: ComponentFixture<MeetingConfirmationRequestPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeetingConfirmationRequestPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetingConfirmationRequestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
