import { TestBed } from '@angular/core/testing';

import { EstadisticasService } from '../services/estadisticas.service';

describe('EstadisticasService', () => {
  let service: EstadisticasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EstadisticasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
