package com.kendoui.spring.controllers.dateinput;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller("dateinput-navigation-controller")
@RequestMapping(value="/dateinput/")
public class KeyboardNavigationController {
    
    @RequestMapping(value = {"/keyboard-navigation"}, method = RequestMethod.GET)
    public String index() {       
        return "dateinput/keyboard-navigation";
    }    
}