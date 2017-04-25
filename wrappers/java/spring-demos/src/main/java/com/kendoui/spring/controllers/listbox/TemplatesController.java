package com.kendoui.spring.controllers.listbox;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.kendoui.spring.models.CustomerDao;
import com.kendoui.spring.models.Customer;
@Controller("listbox-templates-controller")
@RequestMapping(value="/listbox/")
public class TemplatesController {
    
    @Autowired 
    private CustomerDao customer;
    
    @RequestMapping(value = {"/", "/templates"}, method = RequestMethod.GET)
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
        List<Customer> products = new ArrayList<Customer>();
        model.addAttribute("selected", products);
        model.addAttribute("dropSources1", new String[] { "selected" });
        model.addAttribute("dropSources2", new String[] { "optional" });
        return "listbox/templates";
    }
    
    @RequestMapping(value = "/templates/read", method = RequestMethod.POST)
    public @ResponseBody List<Customer> read() {
        return customer.getList();
    }
}

