package com.kendoui.spring.models;


public class Video {
    private String title;
    private String url;
    private String poster;   
    
    public Video(String title, String url,String poster) {
        setTitle(title);
        setUrl(url);
        setPoster(poster);
    }

    public String getTitle() {
        return title;
    }
    public String getUrl() {
        return url;
    }
    public String getPoster() {
        return poster;
    }
    public void setTitle(String title) {
        this.title = title;
    }
    public void setUrl(String url) {
        this.url = url;
    }
    public void setPoster(String poster) {
        this.poster = poster;
    }
}
