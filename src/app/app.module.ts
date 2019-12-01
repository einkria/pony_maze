import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { StartMazeComponent } from './components/start-maze/start-maze.component';
import { PlayMazeComponent } from './components/play-maze/play-maze.component';
import { WinningDialogComponent } from './components/winning-dialog/winning-dialog.component';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';

@NgModule({
  declarations: [AppComponent, StartMazeComponent, PlayMazeComponent, WinningDialogComponent, ErrorDialogComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, MatIconModule, MatDialogModule, BrowserAnimationsModule],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [WinningDialogComponent, ErrorDialogComponent],
})
export class AppModule {}
