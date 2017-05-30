package com.kendoui.spring.controllers.grid;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.kendoui.spring.models.Product;
import com.kendoui.spring.models.ProductDao;

@Controller("grid-checkbox-selection-controller")
@RequestMapping(value="/grid/")
public class CheckboxSelectionController {
    
    @Autowired 
    private ProductDao product;
    
    @RequestMapping(value = "/checkbox-selection", method = RequestMethod.GET)
    public String index() {
        return "grid/checkbox-selection";
    }
    
    @RequestMapping(value = "/checkbox-selection/read", method = RequestMethod.POST)
    public @ResponseBody List<Product> read() {
        return product.getList();
    }
}

