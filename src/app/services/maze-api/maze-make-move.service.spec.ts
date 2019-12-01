import { TestBed } from '@angular/core/testing';

import { MazeMakeMoveService } from './maze-make-move.service';

describe('MazeMakeMoveService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MazeMakeMoveService = TestBed.get(MazeMakeMoveService);
    expect(service).toBeTruthy();
  });
});
