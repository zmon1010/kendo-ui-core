package com.kendoui.spring.controllers.upload;
import java.io.IOException;
import java.io.OutputStream;
import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.codehaus.jackson.JsonGenerationException;
import org.codehaus.jackson.JsonNode;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;

@Controller("upload-chunkupload-controller")
@RequestMapping(value="/upload/")
public class ChunkUploadController {
    
    public class FileResult
    {
        public boolean uploaded;
        public String fileUid;
    }
    
    @RequestMapping(value = "/chunkupload", method = RequestMethod.GET)
    public String index() {
        return "upload/chunkupload";
    }
    
    @RequestMapping(value = "/async/chunksave", method = RequestMethod.POST)
    public @ResponseBody String chunksave(@RequestParam List<MultipartFile> files, String metadata) throws JsonGenerationException, JsonMappingException, IOException {
        ObjectMapper mapper = new ObjectMapper();
        long totalChunks = 0;
        long chunkIndex = 0;
        String uploadUid = "";
        String fileName = "";
        //map json to student
          
        if(metadata == null){
            return "";
        }
        
        JsonNode rootNode = mapper.readTree(metadata);
        totalChunks = rootNode.path("totalChunks").getLongValue();
        chunkIndex = rootNode.path("chunkIndex").getLongValue();
        uploadUid = rootNode.path("uploadUid").getTextValue();
        fileName = rootNode.path("fileName").getTextValue();
        
        OutputStream output = null;
        // Save the files
        
         for (MultipartFile file : files) {
            //byte[] bytes = file.getBytes();
            // String rootPath = "C:\\Users\\username\\Desktop";
            // File dir = new File(rootPath + File.separator + "tmpFiles");
            // if (!dir.exists())
            //    dir.mkdirs();

            // Create the file on server
            //  File serverFile = new File(dir.getAbsolutePath()
            //        + File.separator + fileName);
            // BufferedOutputStream stream = new BufferedOutputStream(
            //         new FileOutputStream(serverFile,true));
            // stream.write(bytes);
            //stream.close();
         }
        
        FileResult fileBlob = new FileResult();
        fileBlob.uploaded = totalChunks - 1 <= chunkIndex;
        fileBlob.fileUid = uploadUid;

        return mapper.writeValueAsString(fileBlob);
    }
    
   
}