import { TestBed } from '@angular/core/testing';

import { LogCountServiceService } from './log-count-service.service';

describe('LogCountServiceService', () => {
  let service: LogCountServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LogCountServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
