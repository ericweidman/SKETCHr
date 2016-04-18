package com.theironyard.entities;

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Lazy;

import javax.persistence.*;
import java.util.List;

/**
 * Created by ericweidman on 4/3/16.
 */
@Entity
@Table(name = "drawings")
public class Drawing {

    @Id
    @GeneratedValue
    private int id;

    @Column(nullable = false)
    private String picName;

    @Column(nullable = false, length = 100000000)
    private String fileName;

    @ManyToOne
    private User user;




    public Drawing() {
    }

    public Drawing(String fileName) {
        this.fileName = fileName;
    }

    public Drawing(User user) {
        this.user = user;
    }

    public Drawing(int id, String picName, String fileName, User user) {
        this.id = id;
        this.picName = picName;
        this.fileName = fileName;
        this.user = user;
    }


    public Drawing(String picName, String fileName, User user) {
        this.picName = picName;
        this.fileName = fileName;
        this.user = user;
    }

    public String getPicName() {
        return picName;
    }

    public void setPicName(String picName) {
        this.picName = picName;
    }

    public Drawing(String fileName, User user) {
        this.fileName = fileName;
        this.user = user;
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

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

}
