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

    @ManyToOne
    Drawing drawing;

    public Comment() {
    }

    public Comment(String comment) {
        this.comment = comment;
    }

    public Comment(Drawing drawing) {
        this.drawing = drawing;
    }

    public Comment(String comment, Drawing drawing) {
        this.comment = comment;
        this.drawing = drawing;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public Drawing getDrawing() {
        return drawing;
    }

    public void setDrawing(Drawing drawing) {
        this.drawing = drawing;
    }
}
