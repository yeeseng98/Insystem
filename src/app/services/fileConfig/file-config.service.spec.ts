import { TestBed } from '@angular/core/testing';

import { FileConfigService } from './file-config.service';

describe('FileConfigService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FileConfigService = TestBed.get(FileConfigService);
    expect(service).toBeTruthy();
  });
});
