import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CommentService } from './comment.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  comments: Array<any> = [];
  constructor(
    private commentService: CommentService,
  ) {
  }

  ngOnInit(): void {
    this.load();
  }

  uploadComment({form}: NgForm): void {
    if (form.invalid) { return; }
    this.commentService.uploadComment(form.value).subscribe({
      next: () => {
        this.load();
        form.reset();
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  load(): void{
    this.commentService.loadComment().subscribe({
      next: (data: any) => {
        this.comments = data;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}
