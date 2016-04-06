package com.theironyard.controllers;

import com.theironyard.entities.Drawing;
import com.theironyard.entities.User;
import com.theironyard.services.DrawingRepository;
import com.theironyard.services.UserRepository;
import com.theironyard.utils.PasswordStorage;
import org.h2.tools.Server;
import org.hibernate.engine.spi.QueryParameters;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.swing.plaf.multi.MultiInternalFrameUI;
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


    @RequestMapping(path = "/login", method = RequestMethod.POST)
    public User login(String userName, String password, HttpSession session, HttpServletResponse response) throws Exception {
        User user = users.findByUserName(userName);
        if(user == null){
            user = new User(userName, PasswordStorage.createHash(password));
            users.save(user);
        }
        else if(!PasswordStorage.verifyPassword(password, user.getPasswordHash())){
            throw new Exception("Invalid password!");
        }
         session.setAttribute("userName", userName);
         response.sendRedirect("/");
         return user;
    }

    @RequestMapping(path = "/user", method = RequestMethod.GET)
    public User getUser(@RequestBody User user, HttpSession session){
        return user;
    }

    @RequestMapping(path = "/upload", method = RequestMethod.POST)
    public Drawing upload(MultipartFile drawing) throws IOException {

        File drawingFile = File.createTempFile("drawing", drawing.getOriginalFilename(), new File("public"));
        FileOutputStream fos = new FileOutputStream(drawingFile);
        fos.write(drawing.getBytes());
        Drawing d = new Drawing(drawingFile.getName());
        drawings.save(d);

        return null;
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
