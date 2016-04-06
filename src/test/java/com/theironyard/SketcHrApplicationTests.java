package com.theironyard;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.theironyard.entities.Drawing;
import com.theironyard.services.DrawingRepository;
import com.theironyard.services.UserRepository;
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

	@Test
	public void addDrawing() throws Exception {
		Drawing drawing = new Drawing();
		drawing.setFileName("Test");

		ObjectMapper mapper = new ObjectMapper();
		String json = mapper.writeValueAsString(drawing);

        mockMvc.perform(
                MockMvcRequestBuilders.post("/upload")
                        .content(json)
                        .contentType("application/json")
		);
		Assert.assertTrue(drawings.count() == 1);
	}

}
