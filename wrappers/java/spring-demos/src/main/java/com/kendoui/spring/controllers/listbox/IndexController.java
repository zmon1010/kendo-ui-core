package com.kendoui.spring.controllers.listbox;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller("listbox-home-controller")
@RequestMapping(value="/listbox/")
public class IndexController {
    @RequestMapping(value = {"/", "/index"}, method = RequestMethod.GET)
    public String index(Model model) {
       model.addAttribute("tools", new String[] {
        "moveUp", 
        "moveDown", 
        "transferTo", 
        "transferFrom", 
        "transferAllTo", 
        "transferAllFrom",
        "remove"
       });
       model.addAttribute("data", new String[] {
        "Steven White",
        "Nancy King",
        "Nancy Davolio",
        "Robert Davolio",
        "Michael Leverling",
        "Andrew Callahan",
        "Michael Suyama"
       });
       model.addAttribute("selected", new String[]{});
       return "listbox/index";
    }
}

