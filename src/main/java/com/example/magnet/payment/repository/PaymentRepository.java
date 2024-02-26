package com.example.magnet.payment.repository;

import com.example.magnet.payment.entity.Payment;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PaymentRepository extends JpaRepository<Payment, Long> {
    Optional<Payment> findByOrderId(String orderId);

    Optional<Payment> findByPaymentKeyAndMember_Email(String paymentKey, String email);
    Optional<Payment> findByPaymentKey(String paymentKey);

    Slice<Payment> findAllByMember_Email(String email, Pageable pageable);
}
