import { TestBed } from '@angular/core/testing';

import { UploadScriptsService } from './upload-scripts.service';

describe('UploadScriptsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UploadScriptsService = TestBed.get(UploadScriptsService);
    expect(service).toBeTruthy();
  });
});
