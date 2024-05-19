import { TestBed } from '@angular/core/testing';

import { ApiReservasService } from './api-reservas.service';

describe('ApiReservasService', () => {
  let service: ApiReservasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiReservasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
