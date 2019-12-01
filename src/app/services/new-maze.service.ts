import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { NewMazeInfo } from '../models/new-maze-info';

@Injectable({
  providedIn: 'root',
})
export class NewMazeService {
  private mazeUrl = environment.apiUrl + 'maze';

  constructor(private http: HttpClient) {}

  createNewMaze(newMazeInfo: NewMazeInfo): Observable<any> {
    console.log(JSON.stringify(newMazeInfo));
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<any>(this.mazeUrl, JSON.stringify(newMazeInfo), { headers });
  }
}
