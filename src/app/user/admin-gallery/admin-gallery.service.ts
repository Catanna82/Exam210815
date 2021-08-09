import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { IAlbum } from '../../shared/interfaces/albums';

@Injectable()

export class AdminGalleryService {

  constructor(private http: HttpClient) { }

  uploadAlbums({ form, images }: any) {
    return this.http.post<IAlbum>('http://localhost:3000/api/saveAlbums', { ...form.value, images }, { withCredentials: true }).pipe(
      tap(
        data => console.log(data),
        error => console.log(error)
      )
    );
  }

 
}
