import { TestBed } from '@angular/core/testing';

import { RelDespRecMesService } from './rel-desp-rec-mes.service';

describe('RelDespRecMesService', () => {
  let service: RelDespRecMesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RelDespRecMesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
