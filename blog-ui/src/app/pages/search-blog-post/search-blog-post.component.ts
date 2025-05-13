import { Component } from '@angular/core';
import { BlogPostServiceService } from '../../service/blog-post-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-search-blog-post',
  standalone: true,
  imports: [MatCardModule, MatFormFieldModule, MatInputModule, CommonModule, ReactiveFormsModule, FormsModule, MatButtonModule, MatIconModule, MatGridListModule, RouterLink],
  templateUrl: './search-blog-post.component.html',
  styleUrl: './search-blog-post.component.scss'
})
export class SearchBlogPostComponent {

  blogPosts:any[] = [];
  name:string = "";

  constructor(private blogPostService: BlogPostServiceService, private snackBar: MatSnackBar) {}

  searchByName() {
    this.blogPostService.searchBlogPostByName(this.name).subscribe(
      res => {
        this.blogPosts = res;
        console.log(res);
      },
      err => this.snackBar.open("Something went wrong", "Ok")
    );
  }

}
