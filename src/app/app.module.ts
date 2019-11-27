import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StartMazeComponent } from './components/start-maze/start-maze.component';
import { PlayMazeComponent } from './components/play-maze/play-maze.component';

@NgModule({
  declarations: [AppComponent, StartMazeComponent, PlayMazeComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
