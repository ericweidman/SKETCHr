package com.theironyard.services;

import com.theironyard.entities.User;
import org.springframework.data.repository.CrudRepository;

/**
 * Created by ericweidman on 4/3/16.
 */
public interface UserRepository extends CrudRepository<User, Integer> {
    User findByUserName(String userName);
}
