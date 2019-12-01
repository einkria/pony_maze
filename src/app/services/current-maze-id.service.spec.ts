import { TestBed } from '@angular/core/testing';

import { CurrentMazeIdService } from './current-maze-id.service';

describe('CurrentMazeIdService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CurrentMazeIdService = TestBed.get(CurrentMazeIdService);
    expect(service).toBeTruthy();
  });
});
