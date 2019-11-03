import { TestBed } from '@angular/core/testing';

import { StudentConfigService } from './student-config.service';

describe('StudentConfigService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StudentConfigService = TestBed.get(StudentConfigService);
    expect(service).toBeTruthy();
  });
});
