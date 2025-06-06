import { TestBed } from '@angular/core/testing';

import { TipoEventosService } from './tipo-eventos.service';

describe('TipoEventosService', () => {
  let service: TipoEventosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoEventosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
