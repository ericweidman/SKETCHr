package com.theironyard.controllers;

import com.theironyard.entities.Drawing;
import com.theironyard.entities.User;
import com.theironyard.services.CommentRepository;
import com.theironyard.services.DrawingRepository;
import com.theironyard.services.UserRepository;
import com.theironyard.utils.PasswordStorage;
import org.h2.tools.Server;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;
import javax.servlet.http.HttpSession;
import java.sql.SQLException;
import java.util.List;


/**
 * Created by ericweidman on 4/3/16.
 */

@RestController
public class SKETCHrController {
    @Autowired
    UserRepository users;
    @Autowired
    DrawingRepository drawings;
    @Autowired
    CommentRepository comments;

    Server dbui = null;


    @PostConstruct
    public void init() throws SQLException {
        dbui = Server.createWebServer().start();
    }

    @PreDestroy
    public void destroy() {
        dbui.stop();
    }


    @RequestMapping(path = "/create-user", method = RequestMethod.POST)
    public String createUser(@RequestBody User newUser, HttpSession session) throws Exception {

        User user = users.findByUserName(newUser.getUserName());
        if (user == null) {
            user = new User(newUser.getUserName(), PasswordStorage.createHash(newUser.getPasswordHash()));
            users.save(user);
            session.setAttribute("userName", user.getUserName());
        } else {
            throw new Exception("Username already taken.");
        }
        return user.getUserName();
    }

    @RequestMapping(path = "/login", method = RequestMethod.POST)
    public String login(@RequestBody User assumedUser, HttpSession session) throws Exception {
        User user = users.findByUserName(assumedUser.getUserName());
        if (user == null) {
            throw new Exception("Username does not exist.");
        } else if (!PasswordStorage.verifyPassword(assumedUser.getPasswordHash(), user.getPasswordHash())) {
            //Compares the assumedUsers password hash to the one in the DB.
            throw new Exception("Invalid password!");
        }
        session.setAttribute("userName", user.getUserName());
        return user.getUserName();
    }


    @RequestMapping(path = "/user", method = RequestMethod.GET)
    public User getUser(@RequestBody User user, HttpSession session) {
        return null;
    }


    @RequestMapping(path = "/upload", method = RequestMethod.POST)
    public Drawing stringUp(@RequestBody String drawing, HttpSession session) {
        String userName = (String) session.getAttribute("userName");
        User user = users.findByUserName(userName);
        Drawing newDrawing = new Drawing(drawing, user);
        drawings.save(newDrawing);
        return null;
    }

    @RequestMapping(path = "/photo/{id}", method = RequestMethod.GET)
    public Drawing getDrawing(@PathVariable("id") int id) {
        Drawing drawing = drawings.findOne(id);
        return drawing;

    }

    @RequestMapping(path = "/photo/{id}", method = RequestMethod.DELETE)
    public void deleteDrawing(@PathVariable("id") int id) {
        drawings.delete(id);

    }

    @RequestMapping(path = "/gallery", method = RequestMethod.GET)
    public List<Drawing> allDrawings() {
        List<Drawing> allDrawings = (List<Drawing>) drawings.findAll();
        return allDrawings;
    }

    @RequestMapping(path = "/photo/{id}", method = RequestMethod.PUT)
    public Drawing editDrawing(@PathVariable("id") int id, @RequestBody Drawing drawing) {
        Drawing oldDrawing = drawings.findOne(id);
        oldDrawing = drawing;
        drawings.save(drawing);
        return drawing;
    }

    @RequestMapping(path = "/logout", method = RequestMethod.POST)
    public void logout(HttpSession session) {
        session.invalidate();
    }
}
