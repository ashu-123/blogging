package com.server.blog.service;

import com.server.blog.entity.BlogPost;
import com.server.blog.repository.BlogPostRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class BlogPostServiceImpl implements BlogPostService{

    private final BlogPostRepository blogPostRepository;

    public BlogPostServiceImpl(BlogPostRepository blogPostRepository) {
        this.blogPostRepository = blogPostRepository;
    }

    public BlogPost saveBlogPost(BlogPost blogPost) {
        blogPost.setLikeCount(0);
        blogPost.setViewCount(0);
        blogPost.setCreationDate(new Date());

        return blogPostRepository.save(blogPost);
    }

    public List<BlogPost> getAllBlogPosts() {
        return blogPostRepository.findAll();
    }

    public BlogPost getBlogPostById(Long blogPostId) {
        Optional<BlogPost> blogPost = blogPostRepository.findById(blogPostId);
        return blogPost.map(this::incrementViewCount)
                .map(blogPostRepository::save)
                .orElseThrow(() -> new EntityNotFoundException("No Blog Post exists with the given id"));
    }

    public BlogPost likeBlogPost(Long blogPostId) {
        Optional<BlogPost> blogPost = blogPostRepository.findById(blogPostId);
        return blogPost.map(this::incrementLikeCount)
                .map(blogPostRepository::save)
                .orElseThrow(() -> new EntityNotFoundException("No Blog Post exists with the given id"));
    }

    public List<BlogPost> searchBlogPostByName(String name) {
        return blogPostRepository.findByNameContaining(name);
    }

    private BlogPost incrementViewCount(BlogPost blog) {
        blog.setViewCount(blog.getViewCount() + 1);
        return blog;
    }

    private BlogPost incrementLikeCount(BlogPost blog) {
        blog.setLikeCount(blog.getLikeCount()+1);
        return blog;
    }
}
