package com.kendoui.spring.controllers.listbox;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller("listbox-rtl-controller")
@RequestMapping(value="/listbox/")
public class RightToLeftSupportController {
    
    @RequestMapping(value = {"/", "/right-to-left-support"}, method = RequestMethod.GET)
    public String index(Model model) {
        model.addAttribute("sourceTools", new String[] {           
                "transferTo", 
                "transferFrom", 
                "transferAllTo", 
                "transferAllFrom",
        });
        model.addAttribute("destinationTools", new String[] {
                "moveUp", 
                "moveDown", 
                "remove"
        });
        model.addAttribute("source", new String[] {
                "Argentina",
                "Australia",
                "Brazil",
                "Canada",
                "Chile",
                "China",
                "Egypt",
                "England",
                "France",
                "Germany",
                "India",
                "Indonesia",
                "Kenya",
                "Mexico",
                "New Zealand",
                "South Africa",
                "USA"
        });
        model.addAttribute("destinations", new String[] {});
        return "listbox/right-to-left-support";
    }
}

