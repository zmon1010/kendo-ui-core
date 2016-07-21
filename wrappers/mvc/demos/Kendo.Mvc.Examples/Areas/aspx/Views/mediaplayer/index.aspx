<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ContentPlaceHolderID="MainContent" runat="server">
<div class="demo-section k-content">     
    <%= Html.Kendo().MediaPlayer()
        .AutoPlay(true)
        .Media(m=>m.Title("Digital Transformation: A New Way of Thinking").Source(@"\Content\web\mediaplayer\Video1.mp4"))
        .Name("MediaPlayer")
    %>
</div> 
</asp:Content>