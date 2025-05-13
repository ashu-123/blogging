import { Component, OnInit } from '@angular/core';
import { BlogPostServiceService } from '../../service/blog-post-service.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommentService } from '../../service/comment.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-view-blog-post',
  standalone: true,
  imports: [ MatInputModule, MatCardModule, MatIconModule, CommonModule, MatChipsModule, MatButtonModule, ReactiveFormsModule, MatFormFieldModule ],
  templateUrl: './view-blog-post.component.html',
  styleUrl: './view-blog-post.component.scss'
})
export class ViewBlogPostComponent implements OnInit{

  blogPostId = this.activatedRoute.snapshot.params['id'];
  blogPostData:any;

  commentForm!: FormGroup;

  comments: any;

  constructor(private blogPostService: BlogPostServiceService,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private commentService: CommentService
  ) {}

  ngOnInit(): void {
    console.log(this.blogPostId);
    this.getBlogPostById();

    this.commentForm = this.formBuilder.group({
      postedBy: [null, Validators.required],
      content: [null, Validators.required]
    });
  }

  getBlogPostById() {
    this.blogPostService.getBlogPostById(this.blogPostId).subscribe(
      res => {this.blogPostData = res; console.log(this.blogPostData); this.getCommentsByBlogPostId(); },
      err => this.snackBar.open("Something went wrong!!")
    );
  }

  likeBlogPost() {
    this.blogPostService.likeBlogPost(this.blogPostId).subscribe(
      res => { this.snackBar.open("done"); this.getBlogPostById(); },
      err => { console.log(err); this.snackBar.open("Something went wrong!!");}
    );
  }

  publishComment() {
    const postedBy = this.commentForm?.get('postedBy')?.value;
    const content = this.commentForm?.get('content')?.value;

    this.commentService.createComment(this.blogPostId, postedBy, content).subscribe(
      res => {this.snackBar.open("Comment published successfully!", "Ok"); this.getCommentsByBlogPostId(); },
      err => this.snackBar.open("Something went wrong", "Ok")
    );
  }

  getCommentsByBlogPostId() {
    this.commentService.getCommentsByBlogPostId(this.blogPostId).subscribe(
    res => {
      this.comments = res;
    },
    err => { this.snackBar.open("Something went wrong", "Ok")});
  }
}
