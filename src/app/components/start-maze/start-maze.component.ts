import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';

import { Ponies } from '../../models/ponies';
import { NewMazeInfo } from '../../models/new-maze-info';
import { CurrentPonyService } from '../../services/current-pony.service';
import { CurrentMazeIdService } from '../../services/current-maze-id.service';
import { NewMazeService } from '../../services/new-maze.service';

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
    private router: Router
  ) {
    console.log(this.myPonies);
  }

  startMaze() {
    console.log('startMaze');
    this.newMazeInfo = new NewMazeInfo();
    this.newMazeInfo.difficulty = 0;
    this.newMazeInfo['maze-height'] = 15;
    this.newMazeInfo['maze-width'] = 25;
    this.newMazeInfo['maze-player-name'] = this.selectedPony;

    this.newMazeService.createNewMaze(this.newMazeInfo).subscribe(
      res => {
        this.currentMazeIdService.setMazeId(res.maze_id);
        this.router.navigate(['play-maze']);
        // TODO: route to maze
      },
      error => {
        console.log(error);
      }
    );
  }

  onChange(pony) {
    console.log(pony);
    if (this.myPonies.includes(pony)) {
      this.selectedPony = pony;
      this.currentPonyService.setPony(pony);
      this.ponySelected = true;
    } else {
      this.ponySelected = false;
    }
    this.cdRef.detectChanges();
  }
  ngOnInit() {}
}
