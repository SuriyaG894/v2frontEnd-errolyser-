import { TestBed } from '@angular/core/testing';

import { ErrorAnalyzerServiceService } from './error-analyzer-service.service';

describe('ErrorAnalyzerServiceService', () => {
  let service: ErrorAnalyzerServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErrorAnalyzerServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
