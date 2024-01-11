package com.example.magnet.review.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

@Entity
@Getter
@RequiredArgsConstructor
@Builder
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String reviewTitle;
    private String reviewContent;

    // 작성시간, 수정시간 - auditing

    public Review(Long id, String reviewTitle, String reviewContent) {
        this.id = id;
        this.reviewTitle = reviewTitle;
        this.reviewContent = reviewContent;
    }
}
