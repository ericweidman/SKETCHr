package com.theironyard.entities;

import javax.persistence.*;

/**
 * Created by ericweidman on 4/11/16.
 */
@Entity
@Table(name = "comments")
public class Comment {

    @Id
    @GeneratedValue
    int id;

    @Column(nullable = false)
    String comment;

    @Column(nullable = false)
    String userName;

    @ManyToOne
    Drawing drawing;


    public Comment() {
    }

    public Comment(String comment) {
        this.comment = comment;
    }

    public Comment(String comment, String userName) {
        this.comment = comment;
        this.userName = userName;

    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }


    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public Comment(String comment, String userName, Drawing drawing) {
        this.comment = comment;
        this.userName = userName;
        this.drawing = drawing;
    }

    public Comment(int id, String comment, String userName) {
        this.id = id;
        this.comment = comment;
        this.userName = userName;
    }

    public Comment(Drawing drawing, String comment, String userName) {
        this.drawing = drawing;
        this.comment = comment;
        this.userName = userName;
    }
}
