import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent {

  loginHandler(form: NgForm): void {
    if (form.invalid) { return; }
    console.log(form);
  }

}
