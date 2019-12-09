import { Component, OnInit, HostListener, OnDestroy, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

import { WinningDialogComponent } from '../winning-dialog/winning-dialog.component';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';
import { MazeMove } from '../../models/maze-move';
import { MazeMakeMoveService } from '../../services/maze-api/maze-make-move.service';
import { CurrentMazeIdService } from '../../services/observables/current-maze-id.service';
import { DialogService } from '../../services/dialog/dialog.service';
import { MazeCurrentStateService } from '../../services/maze-api/maze-current-state.service';

/**
 * Component where main gameplay takes place. Receives moves from user and sends to API via
 * MazeMakeMoveService. Also uses API via MazeCurrentStateService to create the maze at the start and move the players after each move.
 * After each move, it checks whether the game has been won/lost and if so calls to DialogService
 * to display the appropriate image.
 * Player images and rainbow were drawn as 8 bit figurines using https://www.piskelapp.com/
 */
@Component({
  selector: 'app-play-maze',
  templateUrl: './play-maze.component.html',
  styleUrls: ['./play-maze.component.css'],
})
export class PlayMazeComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('mazeCanvas', { static: false }) mazeCanvas: ElementRef;
  mazeString: any;
  mazeMove: MazeMove;
  idSubscription: Subscription;
  mazeId: string;
  context;
  data;
  size = 35;
  width: number;
  height: number;
  canvasCreated = false;
  /* Player info */
  ponyPos: number;
  monsterPos: number;
  rainbowPos: number;
  ponyPng = 'assets/images/pony.png';
  monsterPng = 'assets/images/monster.png';
  rainbowPng = 'assets/images/rainbow.png';
  ponyImg;
  monsterImg;
  rainbowImg;
  ponyX: number;
  ponyY: number;
  monsterX: number;
  monsterY: number;

  constructor(
    private makeMoveService: MazeMakeMoveService,
    private currentMazeIdService: CurrentMazeIdService,
    private dialogService: DialogService,
    private router: Router,
    private mazeCurrStateService: MazeCurrentStateService
  ) {
    this.mazeMove = new MazeMove();
    // Get the current maze id received from API
    this.idSubscription = this.currentMazeIdService.mazeIdChange.subscribe(id => {
      if (id !== undefined) {
        this.mazeId = id;
      }
    });
  }

  ngOnInit() {}

  ngAfterViewInit() {
    // Using HTML5 Canvas to display game
    this.context = this.mazeCanvas.nativeElement.getContext('2d') as HTMLCanvasElement;
    this.getCurrMazeState();
  }

  // Get maze array and current state of players from API
  getCurrMazeState() {
    this.mazeCurrStateService.getCurrentState(this.mazeId).subscribe(
      res => {
        this.data = res.data;
        this.width = res.size[0];
        this.height = res.size[1];
        this.rainbowPos = +res['end-point'];
        // If this is the first call, we create the maze on the canvas
        if (!this.canvasCreated) {
          this.ponyPos = +res.pony;
          this.monsterPos = +res.domokun;
          this.createMaze();
        } else {
          this.movePony(+res.pony);
          this.moveMonster(+res.domokun);
        }
      },
      err => {
        this.showError('Could not create the maze.');
      }
    );
  }

  // Draws the maze onto the canvas using the data array from the API. Only done once at the start of the game
  createMaze() {
    this.context.canvas.width = this.size * this.width;
    this.context.canvas.height = this.size * this.height;

    let sX = 0;

    for (let i = 0; i < this.data.length; i++) {
      // Calculating where to draw on the canvas for the current i
      const line = Math.floor(i / this.width); // Represents which line on the y axis we are on
      const sY = line * this.size;
      const eX = sX + this.size;
      const eY = (line + 1) * this.size;

      // Check if any player image should be created in this position
      this.createImages(i, sX, sY);

      // left side of maze
      if (sX === 0) {
        this.drawLine(sX, sY, sX, eY);
      }

      // Reading API info on which, if any, walls to draw
      const wallArr = this.data[i];
      if (wallArr.length === 1) {
        if (wallArr[0] === 'west') {
          // draw vertical
          this.drawLine(sX, sY, sX, eY);
        } else {
          // draw horizontal
          this.drawLine(sX, sY, eX, sY);
        }
      } else if (wallArr.length === 2) {
        // draw vertical
        this.drawLine(sX, sY, sX, eY);
        // draw horizontal
        this.drawLine(sX, sY, eX, sY);
      }

      // bottom of maze
      if (eY === this.height * this.size) {
        this.drawLine(sX, sY + this.size, eX, sY + this.size);
      }

      sX = sX + this.size;

      // right side of maze
      if ((i + 1) % this.width === 0) {
        this.drawLine(sX, sY, eX, eY);
        // Going back to the start of the x axis
        sX = 0;
      }
    }
    this.canvasCreated = true;
  }

  /* Functions to create and display players */

  createImages(i: number, sX: number, sY: number) {
    if (this.checkIfCreatingPony(i, this.ponyPos, this.ponyPng, sX, sY)) {
      this.ponyX = sX;
      this.ponyY = sY;
    }
    if (this.checkIfCreatingMonster(i, this.monsterPos, this.monsterPng, sX, sY)) {
      this.monsterX = sX;
      this.monsterY = sY;
    }
    this.checkIfCreatingRainbow(i, this.rainbowPos, this.rainbowPng, sX, sY);
  }

  checkIfCreatingPony(currPos: number, imgPos: number, imagePath: string, pX: number, pY: number) {
    if (currPos === imgPos) {
      this.ponyImg = new Image();
      this.ponyImg.onload = () => {
        this.context.drawImage(this.ponyImg, pX, pY);
      };
      this.ponyImg.src = imagePath;
      return true;
    }
    return false;
  }

  checkIfCreatingMonster(currPos: number, imgPos: number, imagePath: string, pX: number, pY: number) {
    if (currPos === imgPos) {
      this.monsterImg = new Image();
      this.monsterImg.onload = () => {
        this.context.drawImage(this.monsterImg, pX, pY);
      };
      this.monsterImg.src = imagePath;
      return true;
    }
    return false;
  }

  checkIfCreatingRainbow(currPos: number, imgPos: number, imagePath: string, pX: number, pY: number) {
    if (currPos === imgPos) {
      this.rainbowImg = new Image();
      this.rainbowImg.onload = () => {
        this.context.drawImage(this.rainbowImg, pX, pY);
      };
      this.rainbowImg.src = imagePath;
    }
  }
  /* Functions to create and display players, end */

  // Calculates new ponyX and ponyY positions using the updated pony position from API, erases old pony and draws a new one
  movePony(newPonyPos: number) {
    const ponyDiff = this.ponyPos - newPonyPos;
    // Erase old pony, so we only have one at a time
    this.context.clearRect(this.ponyX + 1, this.ponyY + 2, this.size - 5, this.size - 5);
    switch (ponyDiff) {
      case -1: {
        this.ponyX = this.ponyX + this.size;
        break;
      }
      case 1: {
        this.ponyX = this.ponyX - this.size;
        break;
      }
      case this.width: {
        this.ponyY = this.ponyY - this.size;
        break;
      }
      case -this.width: {
        this.ponyY = this.ponyY + this.size;
        break;
      }
    }
    // Draw new pony
    this.context.drawImage(this.ponyImg, this.ponyX, this.ponyY);
    this.ponyPos = newPonyPos;
  }

  // Calculates new monsterX and monsterY positions using the updated monster position from API, erases old monster and draws a new one
  moveMonster(newMonsterPos: number) {
    const monsterDiff = this.monsterPos - newMonsterPos;
    // Erase old monster
    this.context.clearRect(this.monsterX + 1, this.monsterY + 2, this.size - 5, this.size - 5);

    // If monster has passed rainbow, we need to redraw rainbow as it then has been erased
    if (this.monsterPos === this.rainbowPos) {
      this.context.drawImage(this.rainbowImg, this.monsterX, this.monsterY);
    }

    switch (monsterDiff) {
      case -1: {
        this.monsterX = this.monsterX + this.size;
        break;
      }
      case 1: {
        this.monsterX = this.monsterX - this.size;
        break;
      }
      case this.width: {
        this.monsterY = this.monsterY - this.size;
        break;
      }
      case -this.width: {
        this.monsterY = this.monsterY + this.size;
        break;
      }
    }
    // Draw new monster
    this.context.drawImage(this.monsterImg, this.monsterX, this.monsterY);
    this.monsterPos = newMonsterPos;
  }

  // Draws a line from startX and startY position to endX and endY
  drawLine(sX, sY, eX, eY) {
    this.context.moveTo(sX, sY);
    this.context.lineTo(eX, eY);
    this.context.stroke();
  }

  // Listens to the keydown DOM event for user move
  @HostListener('document:keydown', ['$event'])
  north(event: KeyboardEvent) {
    switch (event.key) {
      case 'w':
      case 'W': {
        this.mazeMove.direction = 'north';
        break;
      }
      case 's':
      case 'S': {
        this.mazeMove.direction = 'south';
        break;
      }
      case 'd':
      case 'D': {
        this.mazeMove.direction = 'east';
        break;
      }
      case 'a':
      case 'A': {
        this.mazeMove.direction = 'west';
        break;
      }
      default: {
        return;
      }
    }
    this.makeMove();
  }

  // Sends move to API
  makeMove() {
    this.makeMoveService.makeMove(this.mazeMove, this.mazeId).subscribe(
      res => {
        this.checkWinner(res.state);
      },
      error => {
        this.showError('Could not make a move.');
      }
    );
  }

  // Reading reply from API to check whether game is won/lost or not
  checkWinner(state) {
    if (state === 'won') {
      this.showWinner();
      return;
    }
    if (state === 'over') {
      this.showLoser();
      return;
    }
    this.getCurrMazeState();
  }

  // Display to user they have won the game.
  showWinner() {
    this.dialogService.openDialog(WinningDialogComponent, false, '66%', '80%', 'winner.jpg');
    this.router.navigate(['']);
  }

  // Display to user they have lost the game.
  showLoser() {
    this.dialogService.openDialog(WinningDialogComponent, false, '66%', '80%', 'loser.jpg');
    this.router.navigate(['']);
  }

  // Display to user if error occurred
  showError(msg: string) {
    this.dialogService.openDialog(ErrorDialogComponent, false, '33%', '33%', msg);
    this.router.navigate(['']);
  }

  ngOnDestroy() {
    this.idSubscription.unsubscribe();
  }
}
