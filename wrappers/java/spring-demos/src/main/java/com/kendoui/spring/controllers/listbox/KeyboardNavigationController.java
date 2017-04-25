package com.kendoui.spring.controllers.listbox;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.kendoui.spring.models.Product;
import com.kendoui.spring.models.ProductDao;
@Controller("listbox-keyboard-navigation-controller")
@RequestMapping(value="/listbox/")
public class KeyboardNavigationController {
    
    @Autowired 
    private ProductDao product;
    
    @RequestMapping(value = {"/", "/keyboard-navigation"}, method = RequestMethod.GET)
    public String index(Model model) {
        List<Product> products = new ArrayList<Product>();
        model.addAttribute("data", products);
        return "listbox/keyboard-navigation";
    }
    
    @RequestMapping(value = "/keyboard-navigation/read", method = RequestMethod.POST)
    public @ResponseBody List<Product> read() {
        return product.getList();
    }
}

