package com.kendoui.taglib;

import static org.junit.Assert.*;
import static org.mockito.Mockito.spy;
import java.io.IOException;

import org.junit.Before;
import org.junit.Test;

public class EditorTagTest {
    private EditorTag tag;
    
    @Before
    public void setUp() throws IOException {
        tag = spy(new EditorTag());

        tag.initialize();
        tag.setName("foo");
    }
    
    @Test
    public void createElementCreatesTextarea() throws IOException {
	String tagHtml = tag.html().outerHtml();
 	assertTrue(tagHtml.startsWith("<textarea"));
 	assertTrue(tagHtml.endsWith("</textarea>"));
 	assertTrue(tagHtml.contains("id=\"foo\""));
 	assertTrue(tagHtml.contains("name=\"foo\""));         
    }
}
