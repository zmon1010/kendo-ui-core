package com.kendoui.spring.controllers.grid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.kendoui.spring.models.DataSourceRequest;
import com.kendoui.spring.models.DataSourceResult;
import com.kendoui.spring.models.OrderDao;

@Controller("filter-multi-checkboxes-controller")
@RequestMapping(value="/grid/")
public class FilterMultiCheckboxesController {
    @Autowired 
    private OrderDao order;

    @RequestMapping(value = "/filter-multi-checkboxes", method = RequestMethod.GET)
    public String index() {
        return "grid/filter-multi-checkboxes";
    }
}