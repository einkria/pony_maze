import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { MazeMove } from '../models/maze-move';

@Injectable({
  providedIn: 'root',
})
export class MazeMakeMoveService {
  private mazeUrl = environment.apiUrl + 'maze/';

  constructor(private http: HttpClient) {}

  makeMove(move: MazeMove, mazeId: string): Observable<any> {
    const url = this.mazeUrl + mazeId;
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<any>(url, JSON.stringify(move), { headers });
  }
}
