import { TestBed } from '@angular/core/testing';

import { ArbitroService } from './arbitro.service';

describe('ArbitrosService', () => {
  let service: ArbitroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArbitroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
