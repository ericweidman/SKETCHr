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

}
