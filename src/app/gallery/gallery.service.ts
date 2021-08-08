import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {

  constructor(private http: HttpClient) { }

  loadAlbums() {
    return this.http.get('http://localhost:3000/api/loadAlbums', { withCredentials: true }).pipe(
      tap(
        data => { return data },
        error => console.log(error)
      )
    );
  }

  loadAlbum(file: String) {
    return this.http.get(`http://localhost:3000/api/loadAlbums/${file}`, { withCredentials: true }).pipe(
      tap(
        data => { return data },
        error => console.log(error)
      )
    );
  }
}
