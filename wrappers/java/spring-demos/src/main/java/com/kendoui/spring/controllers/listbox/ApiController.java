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
@Controller("listbox-api-controller")
@RequestMapping(value="/listbox/")
public class ApiController {
    
    @Autowired 
    private ProductDao product;
    
    @RequestMapping(value = {"/api"}, method = RequestMethod.GET)
    public String index(Model model) {
        List<Product> products = new ArrayList<Product>();
        model.addAttribute("selected", products);
        return "listbox/api";
    }
    
    @RequestMapping(value = "/api/read", method = RequestMethod.POST)
    public @ResponseBody List<Product> read() {
        return product.getList();
    }
}

