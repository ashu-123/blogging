import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatCard, MatCardContent } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatChipsModule } from "@angular/material/chips";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { BlogPostServiceService } from '../../service/blog-post-service.service';
import { CommonModule } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-create-blog-post',
  standalone: true,
  imports: [ MatAutocompleteModule, CommonModule, MatCard, MatCardContent, ReactiveFormsModule, MatFormFieldModule, MatChipsModule, MatIconModule, MatInputModule ],
  templateUrl: './create-blog-post.component.html',
  styleUrl: './create-blog-post.component.scss'
})
export class CreateBlogPostComponent implements OnInit{

  postForm!: FormGroup;
  tags:string[] = [];

  filteredSuggestions: string[] = [];

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private snackBar: MatSnackBar,
              private blogPostService: BlogPostServiceService) { }

  ngOnInit(): void {
    this.postForm = this.formBuilder.group({
      name: [null, Validators.required],
      content: [null, [Validators.required, Validators.maxLength(5000)]],
      img: [null, Validators.required],
      postedBy: [null, Validators.required]
    });

    this.postForm.get('name')?.valueChanges
    .pipe(
      debounceTime(1000), // wait 500ms after user stops typing
      distinctUntilChanged()
    )
    .subscribe(
      val => this.blogPostService.getSuggestionsForBlogPostName(val).subscribe(res => this.filteredSuggestions = res));
  }

  add(event:any) {
    const value = (event.value || '').trim();
    if(value) {
      this.tags.push(value);
    }

    event.chipInput!.clear();
  }

  remove(tag:any) {
    const index = this.tags.indexOf(tag);
    if(index>=0) this.tags.splice(index, 1);
  }

  createBlogPost() {
    const data = this.postForm.value;
    data.tags = this.tags;

    this.blogPostService.createNewBlogPost(data).subscribe(
      res => { this.snackBar.open("Blog Post created successfully!!", "Ok"); this.router.navigateByUrl("/")},
      err => { this.snackBar.open("Oops! Something went wrong!") }
    )
  }



}
