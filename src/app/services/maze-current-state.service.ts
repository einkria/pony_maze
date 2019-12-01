import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MazeCurrentStateService {
  private mazeUrl = environment.apiUrl + 'maze/';

  constructor(private http: HttpClient) {}

  getCurrentState(mazeId: string): Observable<any> {
    const url = this.mazeUrl + mazeId;
    return this.http.get<any>(url);
  }
}
