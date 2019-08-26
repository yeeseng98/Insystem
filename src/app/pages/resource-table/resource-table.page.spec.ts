import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceTablePage } from './resource-table.page';

describe('ResourceTablePage', () => {
  let component: ResourceTablePage;
  let fixture: ComponentFixture<ResourceTablePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResourceTablePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourceTablePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
