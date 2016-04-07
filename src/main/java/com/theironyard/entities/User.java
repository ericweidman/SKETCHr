package com.theironyard.entities;

import javax.persistence.*;

/**
 * Created by ericweidman on 4/3/16.
 */
@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue
    int id;

    @Column(nullable = false, unique = true)
    String userName;

    @Column(nullable = false)
    String passwordHash;


    public User() {
    }

    public User(String userName) {
        this.userName = userName;
    }

    public User(String userName, String passwordHash) {
        this.userName = userName;
        this.passwordHash = passwordHash;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPasswordHash() {
        return passwordHash;
    }

    public void setPasswordHash(String passwordHash) {
        this.passwordHash = passwordHash;
    }
}
