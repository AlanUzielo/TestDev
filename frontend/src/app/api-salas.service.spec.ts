import { TestBed } from '@angular/core/testing';

import { ApiSalasService } from './api-salas.service';

describe('ApiSalasService', () => {
  let service: ApiSalasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiSalasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
