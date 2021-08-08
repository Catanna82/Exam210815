import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  constructor(private http: HttpClient) { }

  loadAlbums() {
    return this.http.get('http://localhost:3000/api/loadImages', { withCredentials: true }).pipe(
      tap(
        data => { return data },
        error => console.log(error)
      )
    );
  }
}
