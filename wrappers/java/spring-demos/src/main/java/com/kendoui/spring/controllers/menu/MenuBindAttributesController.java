package com.kendoui.spring.controllers.menu;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller("menu-bind-attributes")
@RequestMapping(value="/menu/")
public class MenuBindAttributesController {
    
    @RequestMapping(value = {"/menu-bind-attributes"}, method = RequestMethod.GET)
    public String index() {       
        return "menu/menu-bind-attributes";
    }    
}