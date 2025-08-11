import { TestBed } from '@angular/core/testing';

import { AssociadoServiceService } from './associado-service.service';

describe('AssociadoServiceService', () => {
  let service: AssociadoServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssociadoServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
