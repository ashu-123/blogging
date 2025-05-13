package com.server.blog.service;

import com.server.blog.entity.BlogPost;

import java.util.List;

public interface BlogPostService {

    BlogPost saveBlogPost(BlogPost blogPost);

    List<BlogPost> getAllBlogPosts();

    BlogPost getBlogPostById(Long blogPostId);

    BlogPost likeBlogPost(Long blogPostId);

    List<BlogPost> searchBlogPostByName(String name);
}
