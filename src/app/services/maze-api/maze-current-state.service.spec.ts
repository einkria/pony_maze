import { TestBed } from '@angular/core/testing';

import { MazeCurrentStateService } from './maze-current-state.service';

describe('MazeCurrentStateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MazeCurrentStateService = TestBed.get(MazeCurrentStateService);
    expect(service).toBeTruthy();
  });
});
