import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private router: Router,
    private userService: UserService
    ) { }

    get isLogged(){
      return this.userService.user;
    }
  ngOnInit(): void {
  }

  logout(): void {
    this.userService.logout();
      this.router.navigate(['/login']);
  }
}
