import { TestBed } from '@angular/core/testing';

import { MicroserviceService } from './microservice.service';

describe('MicroserviceService', () => {
  let service: MicroserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MicroserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
