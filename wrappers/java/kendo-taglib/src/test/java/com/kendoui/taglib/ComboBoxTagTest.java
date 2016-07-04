package com.kendoui.taglib;

import static org.junit.Assert.*;
import static org.mockito.Mockito.spy;
import java.io.IOException;

import org.junit.Before;
import org.junit.Test;

public class ComboBoxTagTest {
    private ComboBoxTag tag;
    
    @Before
    public void setUp() throws IOException {
        tag = spy(new ComboBoxTag());

        tag.initialize();
        tag.setName("foo");
    }
    
    @Test
    public void createElementCreatedInputElement() throws IOException {
     	String tagHtml = tag.html().outerHtml();
	assertTrue(tagHtml.startsWith("<input"));
 	assertTrue(tagHtml.endsWith("/>"));
 	assertTrue(tagHtml.contains("id=\"foo\""));
 	assertTrue(tagHtml.contains("name=\"foo\""));
    
    }
}
