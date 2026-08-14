package com.server.blog.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "authors")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Author {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(nullable = false, unique = true, length = 150)
    private String email;

    @OneToMany(
            mappedBy = "author",
            cascade = CascadeType.ALL,
            orphanRemoval = true,
            fetch = FetchType.LAZY
    )
    private List<BlogPost> blogs = new ArrayList<>();

    // Helper methods

    public void addBlog(BlogPost blog) {
        blogs.add(blog);
        blog.setAuthor(this);
    }

    public void removeBlog(BlogPost blog) {
        blogs.remove(blog);
        blog.setAuthor(null);
    }
}