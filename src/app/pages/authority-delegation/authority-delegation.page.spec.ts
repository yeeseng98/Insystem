import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorityDelegationPage } from './authority-delegation.page';

describe('AuthorityDelegationPage', () => {
  let component: AuthorityDelegationPage;
  let fixture: ComponentFixture<AuthorityDelegationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthorityDelegationPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorityDelegationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
