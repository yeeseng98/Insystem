import { TestBed } from '@angular/core/testing';

import { WorkflowConfigService } from './workflow-config.service';

describe('WorkflowConfigService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WorkflowConfigService = TestBed.get(WorkflowConfigService);
    expect(service).toBeTruthy();
  });
});
