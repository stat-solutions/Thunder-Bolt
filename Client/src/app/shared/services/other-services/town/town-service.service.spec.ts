import { TestBed } from '@angular/core/testing';

import { TownServiceService } from './town-service.service';

describe('TownServiceService', () => {
  let service: TownServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TownServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
