package com.theironyard.entities;

import org.springframework.boot.autoconfigure.SpringBootApplication;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * Created by ericweidman on 4/3/16.
 */
@Entity
@Table(name = "drawings")
public class Drawing {

    @Id
    @GeneratedValue
    int id;


}
