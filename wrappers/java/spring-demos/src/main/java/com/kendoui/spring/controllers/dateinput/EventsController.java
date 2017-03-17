package com.kendoui.spring.controllers.dateinput;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller("dateinput-events-controller")
@RequestMapping(value="/dateinput/")
public class EventsController {
    
    @RequestMapping(value = {"/events"}, method = RequestMethod.GET)
    public String index() {       
        return "dateinput/events";
    }
}