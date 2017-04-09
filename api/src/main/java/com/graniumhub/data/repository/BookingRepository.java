package com.graniumhub.data.repository;

import com.graniumhub.data.domain.Booking;
import com.graniumhub.data.domain.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

/**
 * Created by Sasha on 4/8/17.
 */
public interface BookingRepository extends JpaRepository<Booking, Integer> {

    Optional<Booking> findOne(int id);
}
