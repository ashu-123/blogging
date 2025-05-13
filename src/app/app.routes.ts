import { Routes } from '@angular/router';
import { CreateBlogPostComponent } from './pages/create-blog-post/create-blog-post.component';
import { ViewAllBlogPostComponent } from './pages/view-all-blog-post/view-all-blog-post.component';
import { ViewBlogPostComponent } from './pages/view-blog-post/view-blog-post.component';
import { SearchBlogPostComponent } from './pages/search-blog-post/search-blog-post.component';

export const routes: Routes = [
    { path: 'create-blog-post', component: CreateBlogPostComponent},
    { path: 'view-all-blog-post', component: ViewAllBlogPostComponent},
    { path: 'view-blog-post/:id', component: ViewBlogPostComponent},
    { path: 'search-blog-post', component: SearchBlogPostComponent}
];
