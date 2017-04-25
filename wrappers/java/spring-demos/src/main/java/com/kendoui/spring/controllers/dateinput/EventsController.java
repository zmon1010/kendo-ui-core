package com.kendoui.spring.controllers.dateinput;

import java.util.Date;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.ui.Model;

@Controller("dateinput-events-controller")
@RequestMapping(value="/dateinput/")
public class EventsController {
    
    @RequestMapping(value = {"/events"}, method = RequestMethod.GET)
    public String index(Model model) {
        model.addAttribute("date", new Date());
        return "dateinput/events";
    }
}