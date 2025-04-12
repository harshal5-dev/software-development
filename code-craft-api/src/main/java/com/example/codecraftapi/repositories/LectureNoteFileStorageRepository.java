package com.example.codecraftapi.repositories;

import com.example.codecraftapi.model.LectureNoteFileStorage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LectureNoteFileStorageRepository extends JpaRepository<LectureNoteFileStorage, Integer> {
}
