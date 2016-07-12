<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ContentPlaceHolderID="MainContent" runat="server">
<div class="demo-section k-content">     
    <%= Html.Kendo().MediaPlayer<Kendo.Mvc.Examples.Models.Video>()
        .AutoPlay(true)
        .Playlist(true)
        .Name("MediaPlayer").BindTo((IEnumerable<Kendo.Mvc.Examples.Models.Video>)ViewBag.Videos)
    %>
</div>
</asp:Content>