<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master" Inherits="System.Web.Mvc.ViewPage<IEnumerable<Kendo.Mvc.Examples.Models.ChartCategoryPoint>>" %>


<asp:Content ContentPlaceHolderID="MainContent" runat="server">
<div class="chart-wrapper">
    <%= Html.Kendo().Chart(Model)
        .Name("chart")
        .RenderAs(RenderingMode.Canvas)
        .Series(series => {
            series.Column(model=> model.Value).CategoryField("Category");
        })
        .CategoryAxis(axis => axis
            .Min(0)
            .Max(10)
            .Labels(labels=> labels.Rotation("auto"))
        )
        .Pannable(pannable => pannable
            .Lock(ChartAxisLock.Y)
        )
        .Zoomable(zoomable => zoomable
            .Mousewheel(mousewheel => mousewheel.Lock(ChartAxisLock.Y))
            .Selection(selection => selection.Lock(ChartAxisLock.Y))
        )
    %>
</div>
</asp:Content>
