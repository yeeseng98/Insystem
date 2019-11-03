import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntDeclarationPage } from './int-declaration.page';

describe('IntDeclarationPage', () => {
  let component: IntDeclarationPage;
  let fixture: ComponentFixture<IntDeclarationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntDeclarationPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntDeclarationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
