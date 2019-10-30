import { TestBed } from '@angular/core/testing';

import { AccessConfigService } from './access-config.service';

describe('AccessConfigService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AccessConfigService = TestBed.get(AccessConfigService);
    expect(service).toBeTruthy();
  });
});
