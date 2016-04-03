package com.theironyard.services;

import com.theironyard.entities.Drawing;
import org.springframework.data.repository.CrudRepository;


/**
 * Created by ericweidman on 4/3/16.
 */
public interface DrawingRepository extends CrudRepository<Drawing, Integer> {


}
