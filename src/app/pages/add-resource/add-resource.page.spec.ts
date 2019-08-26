import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddResourcePage } from './add-resource.page';

describe('AddResourcePage', () => {
  let component: AddResourcePage;
  let fixture: ComponentFixture<AddResourcePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddResourcePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddResourcePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
