import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFormPage } from './create-form.page';

describe('CreateFormPage', () => {
  let component: CreateFormPage;
  let fixture: ComponentFixture<CreateFormPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateFormPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
