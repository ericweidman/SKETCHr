package com.theironyard.controllers;

import com.theironyard.entities.Drawing;
import com.theironyard.entities.User;
import com.theironyard.services.DrawingRepository;
import com.theironyard.services.UserRepository;
import org.h2.tools.Server;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.sql.SQLException;


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


    @RequestMapping(path = "/user", method = RequestMethod.POST)
    public User addUser(@RequestBody User user, HttpSession session){
        users.save(user);
        return user;
    }

    @RequestMapping(path = "/user", method = RequestMethod.GET)
    public User getUser(@RequestBody User user, HttpSession session){
        return user;
    }

    @RequestMapping(path = "/upload", method = RequestMethod.POST)
    public Drawing upload(MultipartFile drawing, HttpServletResponse response) throws IOException {


        File drawingFile = File.createTempFile("drawing", drawing.getOriginalFilename(), new File("public"));
        FileOutputStream fos = new FileOutputStream(drawingFile);
        fos.write(drawing.getBytes());
        Drawing d = new Drawing(drawingFile.getName());
        drawings.save(d);
        response.sendRedirect("/");
        return d;
    }
    @RequestMapping(path = "/photos/{id}", method = RequestMethod.GET)
    public Drawing getDrawing( @PathVariable("id") int id){
        return drawings.findOne(id);
    }
    @RequestMapping(path = "/upload/{id}", method = RequestMethod.DELETE)
    public void deleteDrawing(@PathVariable("id") int id){

    }
    @RequestMapping(path = "/upload/{id}", method = RequestMethod.PUT)
    public Drawing editDrawing(@PathVariable("id") int id, MultipartFile drawing){
        return null;
    }

    @RequestMapping(path = "/logout", method = RequestMethod.POST)
    public void logout(HttpSession session){
        session.invalidate();
    }

}
