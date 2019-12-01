import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CurrentMazeIdService {
  currentMazeId: string;
  mazeIdChange: BehaviorSubject<string> = new BehaviorSubject<string>(this.currentMazeId);

  constructor() {
    this.mazeIdChange.subscribe(value => {
      this.currentMazeId = value;
    });
  }

  setMazeId(id: string) {
    this.mazeIdChange.next(id);
  }
}
