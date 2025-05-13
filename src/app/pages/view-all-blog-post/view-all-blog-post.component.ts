import { Component, OnInit } from '@angular/core';
import { BlogPostServiceService } from '../../service/blog-post-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { DatePipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-view-all-blog-post',
  standalone: true,
  imports: [ MatCardModule, DatePipe, CommonModule, MatGridListModule, MatButtonModule, MatIconModule, RouterLink ],
  templateUrl: './view-all-blog-post.component.html',
  styleUrl: './view-all-blog-post.component.scss'
})
export class ViewAllBlogPostComponent implements OnInit{

  blogPosts: any;
  constructor(private blogPostService: BlogPostServiceService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.getAllBlogPosts();
  }

  getAllBlogPosts() {
    this.blogPostService.getAllBlogPosts().subscribe(
      res => { console.log(res); this.blogPosts = res },
      err => this.snackBar.open("Something went wrong!!", "Ok"));
  }

}
