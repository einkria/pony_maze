import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StartMazeComponent } from './components/start-maze/start-maze.component';
import { PlayMazeComponent } from './components/play-maze/play-maze.component';

const routes: Routes = [
  { path: '', component: StartMazeComponent },
  { path: 'play-maze', component: PlayMazeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
