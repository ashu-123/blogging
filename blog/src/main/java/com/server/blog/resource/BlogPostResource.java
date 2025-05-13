package com.server.blog.resource;

import com.server.blog.entity.BlogPost;
import com.server.blog.service.BlogPostService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.http.HttpStatus.*;

@RestController
@RequestMapping("/api/posts")
@CrossOrigin
public class BlogPostResource {

    private final BlogPostService blogPostService;

    public BlogPostResource(BlogPostService blogPostService) {
        this.blogPostService = blogPostService;
    }

    @PostMapping
    public ResponseEntity<BlogPost> createBlogPost(@RequestBody BlogPost blogPost) {
        BlogPost createdBlogPost = blogPostService.saveBlogPost(blogPost);
        return ResponseEntity.status(CREATED).body(createdBlogPost);
    }

    @GetMapping
    public ResponseEntity<List<BlogPost>> getAllBlogPosts() {
        return ResponseEntity.status(OK).body(blogPostService.getAllBlogPosts());
    }

    @GetMapping("/{blogPostId}")
    public ResponseEntity<BlogPost> getBlogPostById(@PathVariable Long blogPostId) {
        return ResponseEntity.status(OK).body(blogPostService.getBlogPostById(blogPostId));
    }

    @PutMapping("/{blogPostId}/like")
    public ResponseEntity<String[]> likeBlogPost(@PathVariable Long blogPostId) {
        blogPostService.likeBlogPost(blogPostId);
        return ResponseEntity.status(OK).body(new String[]{"Blog post liked successfully!"});
    }

    @GetMapping("/search/{name}")
    public ResponseEntity<List<BlogPost>> searchBlogPostByName(@PathVariable String name) {
        return ResponseEntity.status(OK).body(blogPostService.searchBlogPostByName(name));
    }
}
