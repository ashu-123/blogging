package com.server.blog.service;

import com.server.blog.entity.BlogPost;
import com.server.blog.entity.Comment;
import com.server.blog.repository.BlogPostRepository;
import com.server.blog.repository.CommentRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class CommentServiceImpl implements CommentService{

    private final BlogPostRepository blogPostRepository;

    private final CommentRepository commentRepository;

    public CommentServiceImpl(BlogPostRepository blogPostRepository, CommentRepository commentRepository) {
        this.blogPostRepository = blogPostRepository;
        this.commentRepository = commentRepository;
    }

    public Comment createComment(Long blogPostId, String postedBy, String content) {
        Optional<BlogPost> blogPost = blogPostRepository.findById(blogPostId);

        if(blogPost.isPresent()) {
            Comment comment = new Comment();
            comment.setBlogPost(blogPost.get());
            comment.setPostedBy(postedBy);
            comment.setContent(content);
            comment.setCreatedAt(new Date());

            return commentRepository.save(comment);
        }
        throw new EntityNotFoundException("Blog post not found");
    }

    public List<Comment> getCommentsByBlogPostId(Long blogPostId) {
        return commentRepository.findByBlogPostId(blogPostId);
    }
}
