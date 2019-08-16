import { TestBed } from '@angular/core/testing';

import { RequestConfigService } from './request-config.service';

describe('RequestConfigService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RequestConfigService = TestBed.get(RequestConfigService);
    expect(service).toBeTruthy();
  });
});
