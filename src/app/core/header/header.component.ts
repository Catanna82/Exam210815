import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor( private router: Router ) { }

    get isLogged(): boolean{
      return !!sessionStorage.getItem('userEmail');
    }

    get isAdmin(): boolean{
      return !!sessionStorage.getItem('admin');
    }

  logout(): void {
    sessionStorage.clear();
    this.router.navigate(['/']);
  }
}
