import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

/**
 * Stores the current pony name chosen by the user, so that all components that need it can subscribe to it.
 */
@Injectable({
  providedIn: 'root',
})
export class CurrentPonyService {
  currentPony: string;
  ponyChange: BehaviorSubject<string> = new BehaviorSubject<string>(this.currentPony);

  constructor() {
    this.ponyChange.subscribe(value => {
      this.currentPony = value;
    });
  }

  setPony(pony: string) {
    this.ponyChange.next(pony);
  }
}
