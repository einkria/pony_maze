import { TestBed } from '@angular/core/testing';

import { PrintMazeService } from './print-maze.service';

describe('PrintMazeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PrintMazeService = TestBed.get(PrintMazeService);
    expect(service).toBeTruthy();
  });
});
