package org.example.repository;

import org.example.entity.User;

public interface UserRepository {
    void save(User user);
    User findByEmail(String email);
}
