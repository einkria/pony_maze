import { Component, OnInit, ChangeDetectorRef, HostListener, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

import { WinningDialogComponent } from '../winning-dialog/winning-dialog.component';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';
import { MazeMove } from '../../models/maze-move';
import { PrintMazeService } from '../../services/maze-api/print-maze.service';
import { MazeMakeMoveService } from '../../services/maze-api/maze-make-move.service';
import { CurrentMazeIdService } from '../../services/observables/current-maze-id.service';
import { DialogService } from '../../services/dialog/dialog.service';

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
    private currentMazeIdService: CurrentMazeIdService,
    private dialogService: DialogService,
    private router: Router
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
        this.mazeMove.direction = 'north';
        break;
      }
      case 'ArrowDown': {
        this.mazeMove.direction = 'south';
        break;
      }
      case 'ArrowRight': {
        this.mazeMove.direction = 'east';
        break;
      }
      case 'ArrowLeft': {
        this.mazeMove.direction = 'west';
        break;
      }
      default: {
        return;
      }
    }
    this.makeMove();
  }

  makeMove() {
    this.makeMoveService.makeMove(this.mazeMove, this.mazeId).subscribe(
      res => {
        this.checkWinner(res.state);
        // over - loss
        // won - win
      },
      error => {
        this.showError('Could not make a move');
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
        this.maze = this.mazeString.split('\n');
        this.cdRef.detectChanges();
      }
    );
  }

  checkWinner(state) {
    if (state === 'won') {
      this.showWinner();
      return;
    }
    if (state === 'over') {
      this.showLoser();
      return;
    }
    this.printMaze();
  }

  showWinner() {
    this.dialogService.openDialog(WinningDialogComponent, false, '66%', '80%', 'winner.jpg');
    this.router.navigate(['']);
  }

  showLoser() {
    this.dialogService.openDialog(WinningDialogComponent, false, '66%', '80%', 'loser.jpg');
    this.router.navigate(['']);
  }

  showError(msg: string) {
    this.dialogService.openDialog(ErrorDialogComponent, false, '33%', '33%', msg);
    this.router.navigate(['']);
  }

  ngOnDestroy() {
    this.idSubscription.unsubscribe();
  }
}
