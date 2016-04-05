package com.theironyard.entities;

import javax.persistence.*;

/**
 * Created by ericweidman on 4/3/16.
 */
@Entity
@Table(name = "Users")
public class User {

    @Id
    @GeneratedValue
    int id;

    @Column(nullable = false, unique = true)
    String userName;

    @Column(nullable = false)
    String userPass;


    public User() {
    }

    public User(String userName, String userPass) {
        this.userName = userName;
        this.userPass = userPass;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getUserPass() {
        return userPass;
    }

    public void setUserPass(String userPass) {
        this.userPass = userPass;
    }
}
