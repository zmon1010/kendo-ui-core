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
    
    @RequestMapping(value = {"/", "/index"}, method = RequestMethod.GET)
    public String index() {
        return "mediaplayer/index";
    }
}

