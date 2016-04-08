package com.theironyard;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.theironyard.entities.Drawing;
import com.theironyard.entities.User;
import com.theironyard.services.DrawingRepository;
import com.theironyard.services.UserRepository;
import com.theironyard.utils.PasswordStorage;
import org.h2.util.New;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import java.util.List;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = SketcHrApplication.class)
@WebAppConfiguration
public class SketcHrApplicationTests {


    @Autowired
    UserRepository users;

    @Autowired
    DrawingRepository drawings;

    @Autowired
    WebApplicationContext wap;

    MockMvc mockMvc;

    @Before
    public void before() {
        mockMvc = MockMvcBuilders.webAppContextSetup(wap).build();
    }

//	@Test
//	public void addDrawing() throws Exception {
//		Drawing drawing = new Drawing();
//		drawing.setFileName("Test");
//
//		ObjectMapper mapper = new ObjectMapper();
//		String json = mapper.writeValueAsString(drawing);
//
//        mockMvc.perform(
//                MockMvcRequestBuilders.post("/upload")
//                        .content(json)
//                        .contentType("application/json")
//		);
//		Assert.assertTrue(drawings.count() == 1);
//	}

//    @Test
//    public void login() throws Exception {
//
//        User user = new User("Eric", PasswordStorage.createHash("Password"));
//
//        ObjectMapper mapper = new ObjectMapper();
//        String json = mapper.writeValueAsString(user);
//
//        mockMvc.perform(
//                MockMvcRequestBuilders.post("/login")
//                .content(json)
//                .contentType("application/json")
//        );
//        Assert.assertTrue(users.count() ==  1);
//    }


//    @Test
//    public void deleteDrawing() throws Exception {
//
//        ObjectMapper mapper = new ObjectMapper();
//        String json = mapper.writeValueAsString(1);
//        mockMvc.perform(
//                MockMvcRequestBuilders.delete("/photo/1")
//                .content(json)
//                .contentType("application/json")
//        );
//        Assert.assertTrue(drawings.count() == 5);
//    }
//
//    @Test
//    public void getGallery() throws Exception {
//
//        List<Drawing> allDrawings = (List<Drawing>) drawings.findAll();
//
//        ObjectMapper mapper = new ObjectMapper();
//        String json = mapper.writeValueAsString(allDrawings);
//        mockMvc.perform(
//                MockMvcRequestBuilders.get("/gallery")
//                .content(json)
//                .contentType("application/json")
//        );
//        Assert.assertTrue(!allDrawings.isEmpty());
//
//    }

}
