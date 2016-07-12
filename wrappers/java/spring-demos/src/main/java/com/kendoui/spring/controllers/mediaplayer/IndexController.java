package com.kendoui.spring.controllers.mediaplayer;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.kendoui.spring.models.Customer;
import com.kendoui.spring.models.CustomerDao;
import com.kendoui.spring.models.Video;


@Controller("mediaplayer-home-controller")
@RequestMapping(value="/mediaplayer/")
public class IndexController {
    @Autowired 
    private CustomerDao customer;
    
    @RequestMapping(value = {"/", "/index"}, method = RequestMethod.GET)
    public String index() {
        return "mediaplayer/index";
    }
    
    @RequestMapping(value = "/videos", method = RequestMethod.GET)
    public @ResponseBody List<Video> videos() {
        List<Video> videos = new ArrayList<Video>();
        videos.add(new Video("Digital Transformation: A New Way of Thinking","../resources/web/mediaplayer/Video1.mp4","../resources/web/mediaplayer/Video1.jpg"));
        videos.add(new Video("Learn How York Solved Its Database Problem","../resources/web/mediaplayer/Video2.mp4","../resources/web/mediaplayer/Video2.jpg"));
        videos.add(new Video("A Clear Vision for Digital Transformation","../resources/web/mediaplayer/Video3.mp4","../resources/web/mediaplayer/Video3.jpg"));
        return videos;
    }
}

