package com.kendoui.spring.controllers.dateinput;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller("dateinput-api-controller")
@RequestMapping(value="/dateinput/")
public class ApiController {
    
    @RequestMapping(value = {"/api"}, method = RequestMethod.GET)
    public String index() {       
        return "dateinput/api";
    }
}