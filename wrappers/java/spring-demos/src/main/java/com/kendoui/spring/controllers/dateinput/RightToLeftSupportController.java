package com.kendoui.spring.controllers.dateinput;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller("dateinput-rtl-controller")
@RequestMapping(value="/dateinput/")
public class RightToLeftSupportController {
    
    @RequestMapping(value = {"/right-to-left-support"}, method = RequestMethod.GET)
    public String index() {       
        return "dateinput/right-to-left-support";
    }    
}