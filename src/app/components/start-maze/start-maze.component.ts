import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';

import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';
import { Ponies } from '../../models/ponies';
import { NewMazeInfo } from '../../models/new-maze-info';
import { CurrentPonyService } from '../../services/current-pony.service';
import { CurrentMazeIdService } from '../../services/current-maze-id.service';
import { NewMazeService } from '../../services/new-maze.service';
import { DialogService } from '../../services/dialog.service';

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

  onWidthChange(width) {
    this.newMazeInfo['maze-width'] = +width;
  }

  onHeightChange(height) {
    this.newMazeInfo['maze-height'] = +height;
  }

  showError(msg: string) {
    this.dialogService.openDialog(ErrorDialogComponent, false, '33%', '33%', msg);
    this.router.navigate(['']);
  }
}
