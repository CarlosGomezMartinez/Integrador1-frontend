import { TestBed } from '@angular/core/testing';

import { AcquisitionPointService } from './acquisition-point.service';

describe('AcquisitionPointService', () => {
  let service: AcquisitionPointService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AcquisitionPointService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
