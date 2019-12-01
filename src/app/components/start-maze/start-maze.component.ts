import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';

import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';
import { Ponies } from '../../models/ponies';
import { NewMazeInfo } from '../../models/new-maze-info';
import { CurrentPonyService } from '../../services/observables/current-pony.service';
import { CurrentMazeIdService } from '../../services/observables/current-maze-id.service';
import { NewMazeService } from '../../services/maze-api/new-maze.service';
import { DialogService } from '../../services/dialog/dialog.service';

/**
 * Front page of application where user chooses name of pony and dimensions of maze before starting
 * the gameplay. After user presses 'Lets go' button, calls API to create new maze via NewMazeService.
 */
@Component({
  selector: 'app-start-maze',
  templateUrl: './start-maze.component.html',
  styleUrls: ['./start-maze.component.css'],
})
export class StartMazeComponent implements OnInit {
  myPonies = Ponies.myLittlePonies;
  selectedPony: string;
  ponySelected = false;
  newMazeInfo: NewMazeInfo;

  constructor(
    private currentPonyService: CurrentPonyService,
    private cdRef: ChangeDetectorRef,
    private newMazeService: NewMazeService,
    private currentMazeIdService: CurrentMazeIdService,
    private router: Router,
    private dialogService: DialogService
  ) {
    this.newMazeInfo = new NewMazeInfo();
    this.newMazeInfo.difficulty = 0;
    this.newMazeInfo['maze-height'] = 15;
    this.newMazeInfo['maze-width'] = 15;
  }
  ngOnInit() {}

  // Create new maze via API
  startMaze() {
    this.newMazeInfo['maze-player-name'] = this.selectedPony;

    this.newMazeService.createNewMaze(this.newMazeInfo).subscribe(
      res => {
        this.currentMazeIdService.setMazeId(res.maze_id);
        this.router.navigate(['play-maze']);
      },
      error => {
        this.showError('Could not create the maze.');
        this.router.navigate(['']);
      }
    );
  }

  // Detects when user chooses pony name and sets it to the choice
  onChange(pony) {
    if (this.myPonies.includes(pony)) {
      this.selectedPony = pony;
      this.currentPonyService.setPony(pony);
      this.ponySelected = true;
    } else {
      this.ponySelected = false;
    }
    this.cdRef.detectChanges();
  }

  // Detects and sets width of maze
  onWidthChange(width) {
    this.newMazeInfo['maze-width'] = +width;
  }

  // Detects and sets height of maze
  onHeightChange(height) {
    this.newMazeInfo['maze-height'] = +height;
  }

  // Display error to user
  showError(msg: string) {
    this.dialogService.openDialog(ErrorDialogComponent, false, '33%', '33%', msg);
    this.router.navigate(['']);
  }
}
