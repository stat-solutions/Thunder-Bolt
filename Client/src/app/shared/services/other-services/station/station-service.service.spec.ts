import { TestBed } from '@angular/core/testing';

import { StationServiceService } from './station-service.service';

describe('StationServiceService', () => {
  let service: StationServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StationServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
