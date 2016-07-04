package com.kendoui.taglib;

import static org.junit.Assert.*;
import static org.mockito.Mockito.spy;
import java.io.IOException;

import org.junit.Before;
import org.junit.Test;

public class UploadTagTest {
    private UploadTag tag;
    
    @Before
    public void setUp() throws IOException {
        tag = spy(new UploadTag());
        
        tag.initialize();

        tag.setName("foo");
    }
    
    @Test
    public void createElementCreatesInputElement() throws IOException {
        String tagHtml = tag.html().outerHtml();
 	assertTrue(tagHtml.startsWith("<input"));
 	assertTrue(tagHtml.endsWith("/>"));
 	assertTrue(tagHtml.contains("id=\"foo\""));
 	assertTrue(tagHtml.contains("name=\"foo\""));
	assertTrue(tagHtml.contains("type=\"file\""));
    }
}
