package com.theironyard.services;

import com.theironyard.entities.Comment;
import org.springframework.data.repository.CrudRepository;

/**
 * Created by ericweidman on 4/11/16.
 */
public interface CommentRepository extends CrudRepository<Comment, Integer> {
}
