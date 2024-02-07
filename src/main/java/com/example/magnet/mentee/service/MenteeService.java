package com.example.magnet.mentee.service;

import com.example.magnet.mentee.repository.MenteeRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PostMapping;

@Service
@Slf4j
@Transactional
@RequiredArgsConstructor
public class MenteeService {
    private final MenteeRepository menteeRepository;

}
