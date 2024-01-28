package com.example.magnet.global.audit;

import jakarta.persistence.Column;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.MappedSuperclass;
import lombok.Getter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@EntityListeners(AuditingEntityListener.class) // 이벤트 기반으로 동작, 자동으로 필드를 관리한다.
@MappedSuperclass
@Getter
public class TimeEntity {
    @CreatedDate
    @Column(updatable = false)
    private LocalDateTime createdDate;

    @LastModifiedDate
    private LocalDateTime lastModifiedDate;

    private LocalDateTime deletedAt;

//    // 삭제
//    public void deleteSoftly(LocalDateTime deletedAt) {
//        this.deletedAt = deletedAt;
//    }
//
//    // 확인
//    public boolean isSoftDeleted() {
//        return null != deletedAt;
//    }
//    // 삭제 취소
//    public void undoDeletion(){
//        this.deletedAt = null;
//    }
}
