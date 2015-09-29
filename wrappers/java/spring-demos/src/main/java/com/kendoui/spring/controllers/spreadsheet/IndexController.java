package com.kendoui.spring.controllers.spreadsheet;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;


@Controller("spreadsheet-home-controller")
@RequestMapping(value="/spreadsheet/")
public class IndexController {
    @RequestMapping(value = {"/", "/index"}, method = RequestMethod.GET)
    public String index() {
        return "spreadsheet/index";
    }
}

