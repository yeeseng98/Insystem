import { TestBed } from '@angular/core/testing';

import { TaskConfigService } from './task-config.service';

describe('TaskConfigService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TaskConfigService = TestBed.get(TaskConfigService);
    expect(service).toBeTruthy();
  });
});
