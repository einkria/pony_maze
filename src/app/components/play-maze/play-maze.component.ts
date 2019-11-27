import { Component, OnInit, ChangeDetectorRef, HostListener, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { MazeMove } from '../../models/maze-move';
import { PrintMazeService } from '../../services/print-maze.service';
import { MazeMakeMoveService } from '../../services/maze-make-move.service';
import { CurrentMazeIdService } from '../../services/current-maze-id.service';

@Component({
  selector: 'app-play-maze',
  templateUrl: './play-maze.component.html',
  styleUrls: ['./play-maze.component.css'],
})
export class PlayMazeComponent implements OnInit, OnDestroy {
  mazeString: any;
  maze: any;
  mazeMove: MazeMove;
  idSubscription: Subscription;
  mazeId: string;

  constructor(
    private printMazeService: PrintMazeService,
    private cdRef: ChangeDetectorRef,
    private makeMoveService: MazeMakeMoveService,
    private currentMazeIdService: CurrentMazeIdService
  ) {
    this.mazeMove = new MazeMove();
    this.idSubscription = this.currentMazeIdService.mazeIdChange.subscribe(id => {
      if (id !== undefined) {
        this.mazeId = id;
      }
    });
  }

  ngOnInit() {
    this.printMaze();
  }

  @HostListener('document:keydown', ['$event'])
  north(event: KeyboardEvent) {
    switch (event.key) {
      case 'ArrowUp': {
        console.log('north');
        this.mazeMove.direction = 'north';
        break;
      }
      case 'ArrowDown': {
        console.log('south');
        this.mazeMove.direction = 'south';
        break;
      }
      case 'ArrowRight': {
        console.log('east');
        this.mazeMove.direction = 'east';
        break;
      }
      case 'ArrowLeft': {
        console.log('west');
        this.mazeMove.direction = 'west';
        break;
      }
      default: {
        console.log('not a valid key');
        break;
      }
    }
    this.makeMove();
  }

  makeMove() {
    this.makeMoveService.makeMove(this.mazeMove, this.mazeId).subscribe(
      res => {
        console.log(res);
        this.printMaze();
      },
      error => {
        console.log(error);
      }
    );
  }

  printMaze() {
    this.printMazeService.printCurrentState(this.mazeId).subscribe(
      res => {
        this.maze = res;
        this.cdRef.detectChanges();
      },
      error => {
        this.mazeString = JSON.parse(JSON.stringify(error.error.text));
        console.log(this.mazeString);
        this.maze = this.mazeString.split('\n');
        console.log(this.maze);
        this.cdRef.detectChanges();
      }
    );
  }

  ngOnDestroy() {
    this.idSubscription.unsubscribe();
  }
}
