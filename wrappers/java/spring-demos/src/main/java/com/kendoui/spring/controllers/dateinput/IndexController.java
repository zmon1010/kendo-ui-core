package com.kendoui.spring.controllers.dateinput;

import java.util.Date;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller("dateinput-home-controller")
@RequestMapping(value="/dateinput/")
public class IndexController {
    
    @RequestMapping(value = {"/", "/index"}, method = RequestMethod.GET)
    public String index(Model model) {
        model.addAttribute("date", new Date());
        return "dateinput/index";
    }    
}