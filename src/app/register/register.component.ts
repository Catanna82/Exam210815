import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { sameValueValidateFactory } from '../same-value-validate-fn';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnDestroy {
  
  form: FormGroup;

  subscription!: Subscription;
  
    constructor(
      private fb: FormBuilder,
      private router: Router,
      private userService: UserService,
       http: HttpClient) {

    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      repeatPassword: ['']
    });

    const sameValueValidate = sameValueValidateFactory('repeatPassword', this.form.get('password')!, 'password');

    this.subscription = this.form.get('password')!.valueChanges!.subscribe(() => {
      this.form.controls.repeatPassword.updateValueAndValidity({ onlySelf: true });
    });

    this.form.controls.repeatPassword.setValidators([Validators.required, Validators.minLength(6), sameValueValidate])
  }

  registerHandler(): void {
    if (this.form.invalid) { return; }
    this.userService.register(this.form.value).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe()
  }

}

// import { Component, OnDestroy } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { Router } from '@angular/router';
// import { Subject } from 'rxjs';
// import { emailValidator, sameValueAsFactory } from 'src/app/shared/validators';
// import { UserService } from '../user.service';

// @Component({
//   selector: 'softuni-register',
//   templateUrl: './register.component.html',
//   styleUrls: ['./register.component.scss']
// })
// export class RegisterComponent implements OnDestroy {

//   killSubscription = new Subject();

//   form: FormGroup;

//   constructor(
//     private fb: FormBuilder,
//     private userService: UserService,
//     private router: Router
//   ) {
//     this.form = this.fb.group({
//       username: ['', [Validators.required, Validators.minLength(4)]],
//       email: ['', [Validators.required, emailValidator]],
//       tel: [''],
//       password: ['', [Validators.required, Validators.minLength(4)]],
//       rePassword: ['', [Validators.required, sameValueAsFactory(
//         () => this.form?.get('password'), this.killSubscription
//       )]]
//     });
//   }

//   register(): void {
//     if (this.form.invalid) { return; }
//     this.userService.register(this.form.value).subscribe({
//       next: () => {
//         this.router.navigate(['/']);
//       },
//       error: (err) => {
//         console.error(err);
//       }
//     })
//   }

//   ngOnDestroy(): void {
//     this.killSubscription.next();
//     this.killSubscription.complete();
//   }

// }