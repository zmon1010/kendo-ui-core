package com.kendoui.spring.controllers.upload;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.codehaus.jackson.map.ObjectMapper;

@Controller("upload-chunkupload-controller")
@RequestMapping(value="/upload/")
public class ChunkUploadController {
    
    public class ChunkMetaData
    {
        private String uploadUid;
        private String fileName;
        private String contentType;
        private int chunkIndex;
        private int totalChunks;
        private int totalFileSize;
        
        public String getUploadUid() {
            return uploadUid;
        }

        public void setUploadUid(String value) {
            uploadUid = value;
        }
        
        public String getFileName() {
            return fileName;
        }

        public void setFileName(String value) {
            fileName = value;
        }
        
        public String getContentType() {
            return contentType;
        }

        public void setContentType(String value) {
            contentType = value;
        }
        
        public int getChunkIndex() {
            return chunkIndex;
        }

        public void setChunkIndex(int value) {
            chunkIndex = value;
        }
        public int getTotalChunks() {
            return totalChunks;
        }

        public void setTotalChunks(int value) {
            totalChunks = value;
        }
        
        public int getTotalFileSize() {
            return totalFileSize;
        }

        public void setTotalFileSize(int value) {
            totalFileSize = value;
        }
    }

    public class FileResult
    {
        private boolean uploaded;
        private String fileUid;
        
        public boolean getUploaded() {
            return uploaded;
        }

        public void setUploaded(boolean value) {
            uploaded = value;
        }
        
        public String getFileUid() {
            return fileUid;
        }

        public void setFileUid(String value) {
            fileUid = value;
        }
    }
    
    
    @RequestMapping(value = "/chunkupload", method = RequestMethod.GET)
    public String index() {
        return "upload/chunkupload";
    }
    
    @RequestMapping(value = "/async/chunksave", method = RequestMethod.POST)
    public @ResponseBody String chunksave(@RequestParam List<MultipartFile> files) {
      //  ObjectMapper mapper = new ObjectMapper();
     //   ChunkMetaData user1 = mapper.readValue(metadata, ChunkMetaData.class);
   //     user1
        // Save the files
        // for (MultipartFile file : files) {
        // }
        
        // Return an empty string to signify success

        
        return "";
    }
}