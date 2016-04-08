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

    @Column(nullable = false, length = 100000)
    String fileName;


    public Drawing() {
    }

    public Drawing(String fileName) {
        this.fileName = fileName;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public int getId() {
        return id;
    }
}
