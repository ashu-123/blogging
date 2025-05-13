package com.server.blog.service;

import com.server.blog.entity.Comment;

import java.util.List;

public interface CommentService {

    Comment createComment(Long blogPostId, String postedBy, String content);

    List<Comment> getCommentsByBlogPostId(Long blogPostId);
}
