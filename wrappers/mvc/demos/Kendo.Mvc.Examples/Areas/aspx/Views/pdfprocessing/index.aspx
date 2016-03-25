<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>


<asp:Content ContentPlaceHolderID="MainContent" runat="server">
    <div id="example">
        <div class="demo-section k-header">
            <img src="/Content/web/pdfprocessing/documentAjax.png" class="documentImage" />
            <% using (Html.BeginForm("Download_Document", "PdfProcessing"))
            {%>
            <input type="submit" value="Download Document" class="k-button downloadBtn" />
            <%}%>
        </div>
    </div>

    <style>
        .downloadBtn {
            margin: 0 auto;
            display: block;
        }

        .documentImage {
            width: 100%;
        }
    </style>
</asp:Content>
