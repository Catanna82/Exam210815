import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { IAlbum } from '../shared/interfaces/albums';

@Injectable()

export class AdminGalleryService {

  constructor(private http: HttpClient) { }

  uploadAlbums({ form, images }: any) {
    // const images = Array.prototype.map.call(files, function(f) {
    //   const reader = new FileReader();
    //   reader.onload = (event) => {
    //     debugger;
    //     // img.src = event.target.result;
    //   };
    //   const formData = new FormData();
    //   formData.append('image', f);
    //   // reader.readAsDataURL(file);
    //   return formData;
    // });
    return this.http.post<IAlbum>('http://localhost:3000/api/saveAlbums', { ...form.value, images }, { withCredentials: true }).pipe(
      tap(
        data => console.log(data),
        error => console.log(error)
      )
    );
  }

 
}
