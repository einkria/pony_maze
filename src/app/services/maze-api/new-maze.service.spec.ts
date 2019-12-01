import { TestBed } from '@angular/core/testing';

import { NewMazeService } from './new-maze.service';

describe('NewMazeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NewMazeService = TestBed.get(NewMazeService);
    expect(service).toBeTruthy();
  });
});
