import { TestBed } from '@angular/core/testing';

import { TestProvService } from './test-prov.service';

describe('TestProvService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TestProvService = TestBed.get(TestProvService);
    expect(service).toBeTruthy();
  });
});
