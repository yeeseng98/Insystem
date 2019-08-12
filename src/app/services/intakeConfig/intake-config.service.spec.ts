import { TestBed } from '@angular/core/testing';

import { IntakeConfigService } from './intake-config.service';

describe('IntakeConfigService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IntakeConfigService = TestBed.get(IntakeConfigService);
    expect(service).toBeTruthy();
  });
});
