package com.theironyard.controllers;

import com.theironyard.entities.Drawing;
import com.theironyard.entities.User;
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

import static org.aspectj.weaver.tools.cache.SimpleCacheFactory.path;


/**
 * Created by ericweidman on 4/3/16.
 */

@RestController
public class SKETCHrController {
    @Autowired
    UserRepository users;
    @Autowired
    DrawingRepository drawings;

    Server dbui = null;


    @PostConstruct
    public void init() throws SQLException {
        dbui = Server.createWebServer().start();
    }

    @PreDestroy
    public void destroy(){
        dbui.stop();
    }

    //right now this route acts as both the login and create user function
    @RequestMapping(path = "/login", method = RequestMethod.POST)
    public User login(String userName, String password, HttpSession session) throws Exception {

        User user = users.findByUserName(userName);
        if(user == null){
            user = new User(userName, PasswordStorage.createHash(password));
            users.save(user);
        }
        else if(!PasswordStorage.verifyPassword(password, user.getPasswordHash())){
            throw new Exception("Invalid password!");
        }
         session.setAttribute("userName", userName);
         return null;

    }

    @RequestMapping(path = "/user", method = RequestMethod.GET)
    public User getUser(@RequestBody User user, HttpSession session){
        return user;
    }


    @RequestMapping(path = "/upload", method = RequestMethod.POST)
    public Drawing stringUp(@RequestBody String drawingString){

        Drawing drawing = new Drawing(drawingString);
        drawings.save(drawing);
        return null;
    }

    @RequestMapping(path = "/photo/{id}", method = RequestMethod.GET)
    public Drawing getDrawing(@PathVariable("id") int id){
        Drawing drawing = drawings.findOne(id);
        return drawing;

    }

    @RequestMapping(path = "/photo/{id}", method = RequestMethod.DELETE)
    public void deleteDrawing(@PathVariable("id") int id){
        drawings.delete(id);

    }

   @RequestMapping(path = "/gallery", method = RequestMethod.GET)
    public List<Drawing> allDrawings(){
      List<Drawing> allDrawings = (List<Drawing>) drawings.findAll();
       return allDrawings;

     }


    @RequestMapping(path = "/photo/{id}", method = RequestMethod.PUT)
    public Drawing editDrawing(@PathVariable("id") int id, @RequestBody Drawing drawing){
        Drawing oldDrawing = drawings.findOne(id);
        oldDrawing = drawing;
        drawings.save(drawing);
        return drawing;
    }

    @RequestMapping(path = "/logout", method = RequestMethod.POST)
    public void logout(HttpSession session){
        session.invalidate();
    }

}
