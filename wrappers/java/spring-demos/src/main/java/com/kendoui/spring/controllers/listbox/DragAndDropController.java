package com.kendoui.spring.controllers.listbox;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller("listbox-drag-and-drop-controller")
@RequestMapping(value="/listbox/")
public class DragAndDropController {
    
    @RequestMapping(value = {"/", "/drag-and-drop"}, method = RequestMethod.GET)
    public String index(Model model) {
        model.addAttribute("data", new String[] {});
        model.addAttribute("list1Source", new String[] { "listbox2"});
        model.addAttribute("list2Source", new String[] { "listbox1" });
        return "listbox/drag-and-drop";
    }
}

