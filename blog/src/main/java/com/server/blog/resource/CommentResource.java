package com.server.blog.resource;

import com.server.blog.entity.Comment;
import com.server.blog.service.CommentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.http.HttpStatus.OK;

@RestController
@RequestMapping("/api/")
@CrossOrigin
public class CommentResource {

    private final CommentService commentService;

    public CommentResource(CommentService commentService) {
        this.commentService = commentService;
    }

    @PostMapping
    public ResponseEntity<Comment> createComment(@RequestParam Long blogPostId,
                                                 @RequestParam String postedBy,
                                                 @RequestParam String content) {
        return ResponseEntity.ok(commentService.createComment(blogPostId, postedBy, content));
    }

    @GetMapping("/{blogPostId}/comments")
    public ResponseEntity<List<Comment>> getCommentsByBlogPostId(@PathVariable Long blogPostId) {
        return ResponseEntity.status(OK).body(commentService.getCommentsByBlogPostId(blogPostId));
    }

}
