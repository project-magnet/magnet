package com.example.magnet.mentor.repository;

import com.example.magnet.mentor.dto.MentorResponseDto;
import com.example.magnet.mentor.dto.MentorSearchResponseDto;
import com.example.magnet.mentor.dto.MentorSearchResponseDtoV2;
import com.example.magnet.mentor.entity.Mentor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface MentorCustomRepository {

    List<Mentor> findAllLeftJoin();
//    Page<MentorSearchResponseDto> search(Pageable pageable);
    Page<MentorSearchResponseDtoV2> search2(Pageable pageable);
}
