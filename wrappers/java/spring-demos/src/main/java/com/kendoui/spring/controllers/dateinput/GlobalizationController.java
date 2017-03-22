package com.kendoui.spring.controllers.dateinput;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.kendoui.spring.models.DropDownListItem;

import java.util.Date;

@Controller("dateinput-localization-globalization-controller")
@RequestMapping(value="/dateinput/")
public class GlobalizationController {

    @RequestMapping(value = {"/localization-globalization"}, method = RequestMethod.GET)
    public String index(Model model) {
        model.addAttribute("cultures", new DropDownListItem[] {
                new DropDownListItem("en-US", "en-US"),
                new DropDownListItem("en-GB", "en-GB"),
                new DropDownListItem("de-DE", "de-DE"),
                new DropDownListItem("fr-FR", "fr-FR"),
                new DropDownListItem("bg-BG", "bg-BG")
        });
        model.addAttribute("languages", new DropDownListItem[] {
                new DropDownListItem("English", "en-US"),
                new DropDownListItem("Bulgarian", "bg-BG")
        });
        model.addAttribute("date", new Date());
        return "dateinput/localization-globalization";
    }
}
