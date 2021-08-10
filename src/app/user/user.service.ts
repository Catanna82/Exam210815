import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { IUser } from '../shared/interfaces/user';



@Injectable()
export class UserService {

  user: IUser | null | undefined;

  get isLogged(): boolean {
    console.log(this.user);
    return !!this.user;
  }

  constructor(
    private http: HttpClient
  ) { }

  login(data: { email: string; password: string; }) {
    return this.http.post<IUser>(`http://localhost:3000/api/login`, data, { withCredentials: true }).pipe(
      tap((user) => {
        if (user) {
          if (data.email === user.email.toLowerCase() && data.password === user.password) {
            sessionStorage.setItem('userEmail', user.email);
            if (user.admin) {
              sessionStorage.setItem('admin', user.email);
            }
          }
        } else {
          throw new Error('User not found!');
        }
      })
    );
  }

  register(data: { email: string; password: string; }) {
    return this.http.post<IUser>(`http://localhost:3000/api/SaveUser`, { ...data }, { withCredentials: true }).pipe(
      tap((user) => sessionStorage.setItem('userEmail', user.email))
    );
  }

  // getProfileInfo() {
  //   return this.http.get<IUser>(`${apiURL}/users/profile`, { withCredentials: true }).pipe(
  //     tap((user) => this.user = user)
  //   )
  // }


  // updateProfile(data: { username: string; email: string; tel: string; }) {
  //   return this.http.put<IUser>(`${apiURL}/users/profile`, data, { withCredentials: true }).pipe(
  //     tap((user) => this.user = user)
  //   );
  // }
}
