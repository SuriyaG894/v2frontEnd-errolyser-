import { TestBed } from '@angular/core/testing';

import { LogParserServiceService } from './log-parser-service.service';

describe('LogParserServiceService', () => {
  let service: LogParserServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LogParserServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
