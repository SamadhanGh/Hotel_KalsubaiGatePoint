package com.hotelkalsubai.repository;

import com.hotelkalsubai.entity.BlogPost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BlogPostRepository extends JpaRepository<BlogPost, Long> {
    List<BlogPost> findByIsPublishedTrueOrderByCreatedAtDesc();
    List<BlogPost> findByAuthor(String author);
    List<BlogPost> findByTitleContainingIgnoreCase(String title);
}