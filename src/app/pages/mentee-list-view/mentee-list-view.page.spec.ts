import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenteeListViewPage } from './mentee-list-view.page';

describe('MenteeListViewPage', () => {
  let component: MenteeListViewPage;
  let fixture: ComponentFixture<MenteeListViewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenteeListViewPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenteeListViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
