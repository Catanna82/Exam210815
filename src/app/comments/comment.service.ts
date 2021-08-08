import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { IComment } from '../shared/interfaces';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }

  uploadComment(form: any){
    return this.http.post<IComment>('http://localhost:3000/api/saveComment', {...form, email: sessionStorage.getItem('userEmail')}, { withCredentials: true }).pipe(
      tap(
        data => console.log(data),
        error => console.log(error)
      )
    );
  }
  loadComment(){
    return this.http.get('http://localhost:3000/api/loadComment', { withCredentials: true }).pipe(
      tap(
        data => console.log(data),
        error => console.log(error)
      )
    );
  }
}
