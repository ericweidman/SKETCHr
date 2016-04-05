package com.theironyard.entities;

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Lazy;

import javax.persistence.*;

/**
 * Created by ericweidman on 4/3/16.
 */
@Entity
@Table(name = "drawings")
public class Drawing {

    @Id
    @GeneratedValue
    int id;

    @Lob @Basic(fetch = FetchType.LAZY)
    @Column(columnDefinition = "BLOB NOT NULL")
    byte[] sketch;


}
