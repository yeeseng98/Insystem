import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceDownloadPage } from './resource-download.page';

describe('ResourceDownloadPage', () => {
  let component: ResourceDownloadPage;
  let fixture: ComponentFixture<ResourceDownloadPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResourceDownloadPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourceDownloadPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
