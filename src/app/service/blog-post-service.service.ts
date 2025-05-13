import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


const BASIC_URL = "http://localhost:8080";

@Injectable({
  providedIn: 'root'
})
export class BlogPostServiceService {

  constructor(private http:HttpClient) { }

  createNewBlogPost(data:any): Observable<any> {
    return this.http.post(BASIC_URL+'/api/posts', data);
  }

  getAllBlogPosts(): Observable<any> {
    return this.http.get(BASIC_URL+'/api/posts');
  }

  getBlogPostById(blogPostId:number): Observable<any> {
    return this.http.get(BASIC_URL+`/api/posts/${blogPostId}`);
  }

  likeBlogPost(blogPostId:number): Observable<any> {
    return this.http.put(BASIC_URL+`/api/posts/${blogPostId}/like`, { });
  }

  searchBlogPostByName(name: string): Observable<any> {
    return this.http.get(BASIC_URL+`/api/posts/search/${name}`);
  }

  getSuggestionsForBlogPostName(name: string): Observable<any> {
    return this.http.get(BASIC_URL+`/api/ollama/${name}`);
  }

}
