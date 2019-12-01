import { TestBed } from '@angular/core/testing';

import { CurrentPonyService } from './current-pony.service';

describe('CurrentPonyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CurrentPonyService = TestBed.get(CurrentPonyService);
    expect(service).toBeTruthy();
  });
});
