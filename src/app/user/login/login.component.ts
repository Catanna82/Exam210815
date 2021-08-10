import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  err: String = "";

  constructor(
    private userService: UserService,
    private router: Router
  ) { }
  loginHandler(form: NgForm): void {
    if (form.invalid) { return; }
    this.userService.login({email: form.value.email.toLowerCase(), password: form.value.password}).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.err = err.message;
      }
    })
  }
}
