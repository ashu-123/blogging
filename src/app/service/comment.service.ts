import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


const BASIC_URL = "http://localhost:8080";

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }

  createComment(blogPostId: string, postedBy: string, content: string): Observable<any> {
    const params = {
      blogPostId: blogPostId,
      postedBy: postedBy,
      content: content
    }
    return this.http.post(BASIC_URL + '/api/', content , {params});
  }

  getCommentsByBlogPostId(blogPostId: number) {
    return this.http.get(BASIC_URL+`/api/${blogPostId}/comments`);
  }

}
