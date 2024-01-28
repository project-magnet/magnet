package com.example.magnet.review.entity;

import com.example.magnet.global.audit.TimeEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Review extends TimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String reviewTitle;
    private String reviewContent;

    // 작성시간, 수정시간 - auditing

    @Builder(toBuilder = true)
    public Review(Long id, String reviewTitle, String reviewContent) {
        this.id = id;
        this.reviewTitle = reviewTitle;
        this.reviewContent = reviewContent;
    }


}
