import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PrintMazeService {
  private mazeUrl = environment.apiUrl + 'maze/';

  constructor(private http: HttpClient) {}

  printCurrentState(mazeId: string): Observable<any> {
    const url = this.mazeUrl + mazeId + '/print';
    const headers = new HttpHeaders().set('Accept', 'text/plain');
    return this.http.get<any>(url, { headers });
  }
}
