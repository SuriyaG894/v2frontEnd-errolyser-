import { TestBed } from '@angular/core/testing';

import { ILogHistoryService } from './ilog-history.service';

describe('ILogHistoryService', () => {
  let service: ILogHistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ILogHistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
