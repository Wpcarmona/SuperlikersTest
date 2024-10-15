import { TestBed } from '@angular/core/testing';

import { DarklyflagService } from './darklyflag.service';

describe('DarklyflagService', () => {
  let service: DarklyflagService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DarklyflagService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
