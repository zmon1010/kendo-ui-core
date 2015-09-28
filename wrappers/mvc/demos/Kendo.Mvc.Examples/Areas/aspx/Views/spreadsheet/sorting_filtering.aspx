<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">

<div id="example">
    <div id="spreadsheet" style="width: 1000px"></div>
    <%:Html.Kendo().Spreadsheet()
        .Name("spreadsheet")
        .HtmlAttributes(new { style = "width: 1000px" })
        .Sheets(sheets =>
        {
            sheets.Add()
                .Name("OrdersLog")
                .MergedCells("A1:G1", "A2:F2")
                .Filter(filter => {
                    filter.Ref("A3:G49").Columns(columns => { });
                })
                .Columns(columns =>
                {
                    columns.Add().Width(80);
                    columns.Add().Width(100);
                    columns.Add().Width(100);
                    columns.Add().Width(150);
                    columns.Add().Width(150);
                    columns.Add().Width(120);
                    columns.Add().Width(120);
                })
                .Rows(rows =>
                {
                    rows.Add().Height(50)
                        .Cells(cells =>
                        {
                            cells.Add()
                                .Value("ORDERS LOG")
                                .Background("rgb(94,151,50)")
                                .Color("white")
                                .FontSize(25);
                        });

                    rows.Add()
                        .Cells(cells =>
                        {
                            cells.Add()
                                .Value("REPORT");
                            
                            cells.Add()
                                .Index(6)
                                .Format("mmm-dd")
                                .Formula("TODAY()");
                        });

                    rows.Add()
                        .Cells(cells =>
                        {
                            cells.Add()
                                .Value("ID")
                                .Background("rgb(146,208,80)")
                                .Color("white")
                                .TextAlign(SpreadsheetTextAlign.Center);

                            cells.Add()
                                .Value("DATE")
                                .Background("rgb(146,208,80)")
                                .Color("white")
                                .TextAlign(SpreadsheetTextAlign.Center);

                            cells.Add()
                                .Value("TIME")
                                .Background("rgb(146,208,80)")
                                .Color("white")
                                .TextAlign(SpreadsheetTextAlign.Center);

                            cells.Add()
                                .Value("CLIENT")
                                .Background("rgb(146,208,80)")
                                .Color("white")
                                .TextAlign(SpreadsheetTextAlign.Center);
                            
                            cells.Add()
                                .Value("COMPANY")
                                .Background("rgb(146,208,80)")
                                .Color("white")
                                .TextAlign(SpreadsheetTextAlign.Center);

                            cells.Add()
                                .Value("SHIPPING")
                                .Background("rgb(146,208,80)")
                                .Color("white")
                                .TextAlign(SpreadsheetTextAlign.Center);

                            cells.Add()
                                .Value("DISCOUNT")
                                .Background("rgb(146,208,80)")
                                .Color("white")
                                .TextAlign(SpreadsheetTextAlign.Center);                            
                        });                                              	      	                      	
    
  	                    rows.Add()
                            .Cells(cells =>
                            {
                                cells.Add()
                                    .Value(10223)
                                    .TextAlign(SpreadsheetTextAlign.Center);
				
                                cells.Add()
            		                    .Value(new DateTime(114, 5, 30))                
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
            		                    .Value(new DateTime(114, 5, 30, 9, 30, 0))                
                                    .Format("hh:mm")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value("Terry Lawson")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value("Excella")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value("1 day")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value(0.02)
                                    .Format("0%")
                                    .TextAlign(SpreadsheetTextAlign.Center);
                            });
  
  	
    
  	                    rows.Add()
                            .Cells(cells =>
                            {
                                cells.Add()
                                    .Value(10247)
                                    .TextAlign(SpreadsheetTextAlign.Center);
				
                                cells.Add()
            		                    .Value(new DateTime(114, 6, 1))                
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
            		                    .Value(new DateTime(114, 6, 1, 15, 15, 0))                
                                    .Format("hh:mm")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value("Charles Miller")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value("Complete Tech")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value("2 days")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value(0.08)
                                    .Format("0%")
                                    .TextAlign(SpreadsheetTextAlign.Center);
                            });
  
  	
    
  	                    rows.Add()
                            .Cells(cells =>
                            {
                                cells.Add()
                                    .Value(10251)
                                    .TextAlign(SpreadsheetTextAlign.Center);
				
                                cells.Add()
            		                    .Value(new DateTime(114, 6, 1))                
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
            		                    .Value(new DateTime(114, 6, 1, 14, 13, 0))                
                                    .Format("hh:mm")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value("Jennie Walker")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value("Plan Smart")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value("2 days")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value(0.1)
                                    .Format("0%")
                                    .TextAlign(SpreadsheetTextAlign.Center);
                            });
  
  	
    
  	                    rows.Add()
                            .Cells(cells =>
                            {
                                cells.Add()
                                    .Value(10226)
                                    .TextAlign(SpreadsheetTextAlign.Center);
				
                                cells.Add()
            		                    .Value(new DateTime(114, 5, 30))                
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
            		                    .Value(new DateTime(114, 5, 30, 17, 43, 0))                
                                    .Format("hh:mm")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value("Samuel Green")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value("Excella")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value("regular")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value(0.08)
                                    .Format("0%")
                                    .TextAlign(SpreadsheetTextAlign.Center);
                            });
  
  	
    
  	                    rows.Add()
                            .Cells(cells =>
                            {
                                cells.Add()
                                    .Value(10227)
                                    .TextAlign(SpreadsheetTextAlign.Center);
				
                                cells.Add()
            		                    .Value(new DateTime(114, 5, 30))                
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
            		                    .Value(new DateTime(114, 5, 30, 10, 27, 0))                
                                    .Format("hh:mm")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value("James Smith")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value("Complete Tech")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value("2 days")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value(0.01)
                                    .Format("0%")
                                    .TextAlign(SpreadsheetTextAlign.Center);
                            });
  
  	
    
  	                    rows.Add()
                            .Cells(cells =>
                            {
                                cells.Add()
                                    .Value(10228)
                                    .TextAlign(SpreadsheetTextAlign.Center);
				
                                cells.Add()
            		                    .Value(new DateTime(114, 5, 30))                
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
            		                    .Value(new DateTime(114, 5, 30, 11, 12, 0))                
                                    .Format("hh:mm")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value("Nora Allen")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value("Plan Smart")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value("express")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value(0)
                                    .Format("0%")
                                    .TextAlign(SpreadsheetTextAlign.Center);
                            });
  
  	
    
  	                    rows.Add()
                            .Cells(cells =>
                            {
                                cells.Add()
                                    .Value(10229)
                                    .TextAlign(SpreadsheetTextAlign.Center);
				
                                cells.Add()
            		                    .Value(new DateTime(114, 5, 29))                
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
            		                    .Value(new DateTime(114, 5, 29, 13, 56, 0))                
                                    .Format("hh:mm")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value("Robyn Mason")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value("Excella")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value("express")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value(0.07)
                                    .Format("0%")
                                    .TextAlign(SpreadsheetTextAlign.Center);
                            });
  
  	
    
  	                    rows.Add()
                            .Cells(cells =>
                            {
                                cells.Add()
                                    .Value(10230)
                                    .TextAlign(SpreadsheetTextAlign.Center);
				
                                cells.Add()
            		                    .Value(new DateTime(114, 5, 29))                
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
            		                    .Value(new DateTime(114, 5, 29, 14, 40, 0))                
                                    .Format("hh:mm")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value("Ralph Burke")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value("Plan Smart")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value("regular")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value(0.06)
                                    .Format("0%")
                                    .TextAlign(SpreadsheetTextAlign.Center);
                            });
  
  	
    
  	                    rows.Add()
                            .Cells(cells =>
                            {
                                cells.Add()
                                    .Value(10231)
                                    .TextAlign(SpreadsheetTextAlign.Center);
				
                                cells.Add()
            		                    .Value(new DateTime(114, 5, 29))                
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
            		                    .Value(new DateTime(114, 5, 29, 8, 25, 0))                
                                    .Format("hh:mm")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value("Patty Prince")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value("Integra Design")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value("1 day")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value(0.02)
                                    .Format("0%")
                                    .TextAlign(SpreadsheetTextAlign.Center);
                            });
  
  	
    
  	                    rows.Add()
                            .Cells(cells =>
                            {
                                cells.Add()
                                    .Value(10232)
                                    .TextAlign(SpreadsheetTextAlign.Center);
				
                                cells.Add()
            		                    .Value(new DateTime(114, 5, 29))                
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
            		                    .Value(new DateTime(114, 5, 29, 10, 9, 0))                
                                    .Format("hh:mm")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value("Natasha Green")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value("Excella")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value("express")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value(0)
                                    .Format("0%")
                                    .TextAlign(SpreadsheetTextAlign.Center);
                            });
  
  	
    
  	                    rows.Add()
                            .Cells(cells =>
                            {
                                cells.Add()
                                    .Value(10233)
                                    .TextAlign(SpreadsheetTextAlign.Center);
				
                                cells.Add()
            		                    .Value(new DateTime(114, 5, 29))                
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
            		                    .Value(new DateTime(114, 5, 29, 12, 54, 0))                
                                    .Format("hh:mm")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value("James Smith")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value("Complete Tech")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value("express")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value(0.03)
                                    .Format("0%")
                                    .TextAlign(SpreadsheetTextAlign.Center);
                            });
  
  	
    
  	                    rows.Add()
                            .Cells(cells =>
                            {
                                cells.Add()
                                    .Value(10259)
                                    .TextAlign(SpreadsheetTextAlign.Center);
				
                                cells.Add()
            		                    .Value(new DateTime(114, 6, 2))                
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
            		                    .Value(new DateTime(114, 6, 2, 11, 28, 0))                
                                    .Format("hh:mm")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value("Francis Stevens")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value("Plan Smart")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value("2 days")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value(0.08)
                                    .Format("0%")
                                    .TextAlign(SpreadsheetTextAlign.Center);
                            });
  
  	
    
  	                    rows.Add()
                            .Cells(cells =>
                            {
                                cells.Add()
                                    .Value(10235)
                                    .TextAlign(SpreadsheetTextAlign.Center);
				
                                cells.Add()
            		                    .Value(new DateTime(114, 5, 29))                
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
            		                    .Value(new DateTime(114, 5, 29, 18, 22, 0))                
                                    .Format("hh:mm")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value("Roger Peters")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value("Integra Design")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value("2 days")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value(0.03)
                                    .Format("0%")
                                    .TextAlign(SpreadsheetTextAlign.Center);
                            });
  
  	
    
  	                    rows.Add()
                            .Cells(cells =>
                            {
                                cells.Add()
                                    .Value(10236)
                                    .TextAlign(SpreadsheetTextAlign.Center);
				
                                cells.Add()
            		                    .Value(new DateTime(114, 5, 29))                
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
            		                    .Value(new DateTime(114, 5, 29, 9, 7, 0))                
                                    .Format("hh:mm")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value("Nora Allen")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value("Plan Smart")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value("express")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value(0.02)
                                    .Format("0%")
                                    .TextAlign(SpreadsheetTextAlign.Center);
                            });
  
  	
    
  	                    rows.Add()
                            .Cells(cells =>
                            {
                                cells.Add()
                                    .Value(10224)
                                    .TextAlign(SpreadsheetTextAlign.Center);
				
                                cells.Add()
            		                    .Value(new DateTime(114, 5, 30))                
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
            		                    .Value(new DateTime(114, 5, 30, 12, 14, 0))                
                                    .Format("hh:mm")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value("Scott Lewis")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value("Circuit Design")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value("express")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value(0.09)
                                    .Format("0%")
                                    .TextAlign(SpreadsheetTextAlign.Center);
                            });
  
  	
    
  	                    rows.Add()
                            .Cells(cells =>
                            {
                                cells.Add()
                                    .Value(10225)
                                    .TextAlign(SpreadsheetTextAlign.Center);
				
                                cells.Add()
            		                    .Value(new DateTime(114, 5, 30))                
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
            		                    .Value(new DateTime(114, 5, 30, 14, 58, 0))                
                                    .Format("hh:mm")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value("Scott Fox")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value("Zig Zag Coder")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value("express")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value(0.1)
                                    .Format("0%")
                                    .TextAlign(SpreadsheetTextAlign.Center);
                            });
  
  	
    
  	                    rows.Add()
                            .Cells(cells =>
                            {
                                cells.Add()
                                    .Value(10239)
                                    .TextAlign(SpreadsheetTextAlign.Center);
				
                                cells.Add()
            		                    .Value(new DateTime(114, 5, 29))                
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
            		                    .Value(new DateTime(114, 5, 29, 17, 20, 0))                
                                    .Format("hh:mm")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value("Marian Rodriguez")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value("Zig Zag Coder")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value("1 day")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value(0.06)
                                    .Format("0%")
                                    .TextAlign(SpreadsheetTextAlign.Center);
                            });
  
  	
    
  	                    rows.Add()
                            .Cells(cells =>
                            {
                                cells.Add()
                                    .Value(10240)
                                    .TextAlign(SpreadsheetTextAlign.Center);
				
                                cells.Add()
            		                    .Value(new DateTime(114, 5, 29))                
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
            		                    .Value(new DateTime(114, 5, 29, 8, 4, 0))                
                                    .Format("hh:mm")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value("Joe Lawrence")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value("Complete Tech")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value("2 days")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value(0.07)
                                    .Format("0%")
                                    .TextAlign(SpreadsheetTextAlign.Center);
                            });
  
  	
    
  	                    rows.Add()
                            .Cells(cells =>
                            {
                                cells.Add()
                                    .Value(10241)
                                    .TextAlign(SpreadsheetTextAlign.Center);
				
                                cells.Add()
            		                    .Value(new DateTime(114, 5, 29))                
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
            		                    .Value(new DateTime(114, 5, 29, 10, 49, 0))                
                                    .Format("hh:mm")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value("Francis Stevens")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value("Plan Smart")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value("regular")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value(0)
                                    .Format("0%")
                                    .TextAlign(SpreadsheetTextAlign.Center);
                            });
  
  	
    
  	                    rows.Add()
                            .Cells(cells =>
                            {
                                cells.Add()
                                    .Value(10242)
                                    .TextAlign(SpreadsheetTextAlign.Center);
				
                                cells.Add()
            		                    .Value(new DateTime(114, 5, 29))                
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
            		                    .Value(new DateTime(114, 5, 29, 13, 33, 0))                
                                    .Format("hh:mm")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value("Lynda Evans")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value("Complete Tech")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value("regular")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value(0.05)
                                    .Format("0%")
                                    .TextAlign(SpreadsheetTextAlign.Center);
                            });
  
  	
    
  	                    rows.Add()
                            .Cells(cells =>
                            {
                                cells.Add()
                                    .Value(10243)
                                    .TextAlign(SpreadsheetTextAlign.Center);
				
                                cells.Add()
            		                    .Value(new DateTime(114, 5, 29))                
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
            		                    .Value(new DateTime(114, 5, 29, 16, 18, 0))                
                                    .Format("hh:mm")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value("Keith Clark")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value("Circuit Design")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value("1 day")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value(0)
                                    .Format("0%")
                                    .TextAlign(SpreadsheetTextAlign.Center);
                            });
  
  	
    
  	                    rows.Add()
                            .Cells(cells =>
                            {
                                cells.Add()
                                    .Value(10244)
                                    .TextAlign(SpreadsheetTextAlign.Center);
				
                                cells.Add()
            		                    .Value(new DateTime(114, 6, 1))                
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
            		                    .Value(new DateTime(114, 6, 1, 19, 2, 0))                
                                    .Format("hh:mm")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value("Kara Wood")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value("Excella")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value("2 days")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value(0)
                                    .Format("0%")
                                    .TextAlign(SpreadsheetTextAlign.Center);
                            });
  
  	
    
  	                    rows.Add()
                            .Cells(cells =>
                            {
                                cells.Add()
                                    .Value(10245)
                                    .TextAlign(SpreadsheetTextAlign.Center);
				
                                cells.Add()
            		                    .Value(new DateTime(114, 6, 1))                
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
            		                    .Value(new DateTime(114, 6, 1, 9, 46, 0))                
                                    .Format("hh:mm")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value("Juan Jacobs")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value("Plan Smart")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value("regular")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value(0.07)
                                    .Format("0%")
                                    .TextAlign(SpreadsheetTextAlign.Center);
                            });
  
  	
    
  	                    rows.Add()
                            .Cells(cells =>
                            {
                                cells.Add()
                                    .Value(10237)
                                    .TextAlign(SpreadsheetTextAlign.Center);
				
                                cells.Add()
            		                    .Value(new DateTime(114, 5, 29))                
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
            		                    .Value(new DateTime(114, 5, 29, 13, 51, 0))                
                                    .Format("hh:mm")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value("Samuel Green")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value("Excella")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value("express")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value(0.15)
                                    .Format("0%")
                                    .TextAlign(SpreadsheetTextAlign.Center);
                            });
  
  	
    
  	                    rows.Add()
                            .Cells(cells =>
                            {
                                cells.Add()
                                    .Value(10265)
                                    .TextAlign(SpreadsheetTextAlign.Center);
				
                                cells.Add()
            		                    .Value(new DateTime(114, 6, 2))                
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
            		                    .Value(new DateTime(114, 6, 2, 14, 36, 0))                
                                    .Format("hh:mm")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value("Alison Thompson")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value("Circuit Design")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value("express")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value(0.1)
                                    .Format("0%")
                                    .TextAlign(SpreadsheetTextAlign.Center);
                            });
  
  	
    
  	                    rows.Add()
                            .Cells(cells =>
                            {
                                cells.Add()
                                    .Value(10248)
                                    .TextAlign(SpreadsheetTextAlign.Center);
				
                                cells.Add()
            		                    .Value(new DateTime(114, 6, 1))                
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
            		                    .Value(new DateTime(114, 6, 1, 18, 7, 0))                
                                    .Format("hh:mm")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value("Jerry Wright")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value("Integra Design")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value("regular")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value(0.07)
                                    .Format("0%")
                                    .TextAlign(SpreadsheetTextAlign.Center);
                            });
  
  	
    
  	                    rows.Add()
                            .Cells(cells =>
                            {
                                cells.Add()
                                    .Value(10234)
                                    .TextAlign(SpreadsheetTextAlign.Center);
				
                                cells.Add()
            		                    .Value(new DateTime(114, 5, 29))                
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
            		                    .Value(new DateTime(114, 5, 29, 15, 38, 0))                
                                    .Format("hh:mm")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value("Nora Allen")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value("Plan Smart")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value("regular")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value(0.1)
                                    .Format("0%")
                                    .TextAlign(SpreadsheetTextAlign.Center);
                            });
  
  	
    
  	                    rows.Add()
                            .Cells(cells =>
                            {
                                cells.Add()
                                    .Value(10238)
                                    .TextAlign(SpreadsheetTextAlign.Center);
				
                                cells.Add()
            		                    .Value(new DateTime(114, 5, 29))                
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
            		                    .Value(new DateTime(114, 5, 29, 14, 36, 0))                
                                    .Format("hh:mm")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value("Mark Moore")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value("Webcom Services")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value("regular")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value(0.09)
                                    .Format("0%")
                                    .TextAlign(SpreadsheetTextAlign.Center);
                            });
  
  	
    
  	                    rows.Add()
                            .Cells(cells =>
                            {
                                cells.Add()
                                    .Value(10246)
                                    .TextAlign(SpreadsheetTextAlign.Center);
				
                                cells.Add()
            		                    .Value(new DateTime(114, 6, 1))                
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
            		                    .Value(new DateTime(114, 6, 1, 12, 31, 0))                
                                    .Format("hh:mm")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value("Patty Prince")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value("Integra Design")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value("regular")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value(0.08)
                                    .Format("0%")
                                    .TextAlign(SpreadsheetTextAlign.Center);
                            });
  
  	
    
  	                    rows.Add()
                            .Cells(cells =>
                            {
                                cells.Add()
                                    .Value(10252)
                                    .TextAlign(SpreadsheetTextAlign.Center);
				
                                cells.Add()
            		                    .Value(new DateTime(114, 6, 1))                
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
            		                    .Value(new DateTime(114, 6, 1, 16, 57, 0))                
                                    .Format("hh:mm")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value("James Smith")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value("Complete Tech")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value("express")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value(0.02)
                                    .Format("0%")
                                    .TextAlign(SpreadsheetTextAlign.Center);
                            });
  
  	
    
  	                    rows.Add()
                            .Cells(cells =>
                            {
                                cells.Add()
                                    .Value(10253)
                                    .TextAlign(SpreadsheetTextAlign.Center);
				
                                cells.Add()
            		                    .Value(new DateTime(114, 6, 1))                
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
            		                    .Value(new DateTime(114, 6, 1, 18, 42, 0))                
                                    .Format("hh:mm")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value("Marian Rodriguez")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value("Zig Zag Coder")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value("regular")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value(0.01)
                                    .Format("0%")
                                    .TextAlign(SpreadsheetTextAlign.Center);
                            });
  
  	
    
  	                    rows.Add()
                            .Cells(cells =>
                            {
                                cells.Add()
                                    .Value(10254)
                                    .TextAlign(SpreadsheetTextAlign.Center);
				
                                cells.Add()
            		                    .Value(new DateTime(114, 6, 1))                
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
            		                    .Value(new DateTime(114, 6, 1, 9, 46, 0))                
                                    .Format("hh:mm")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value("Patty Prince")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value("Integra Design")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value("express")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value(0)
                                    .Format("0%")
                                    .TextAlign(SpreadsheetTextAlign.Center);
                            });
  
  	
    
  	                    rows.Add()
                            .Cells(cells =>
                            {
                                cells.Add()
                                    .Value(10255)
                                    .TextAlign(SpreadsheetTextAlign.Center);
				
                                cells.Add()
            		                    .Value(new DateTime(114, 6, 1))                
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
            		                    .Value(new DateTime(114, 6, 1, 12, 31, 0))                
                                    .Format("hh:mm")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value("Jack Sims")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value("Circuit Design")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value("express")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value(0)
                                    .Format("0%")
                                    .TextAlign(SpreadsheetTextAlign.Center);
                            });
  
  	
    
  	                    rows.Add()
                            .Cells(cells =>
                            {
                                cells.Add()
                                    .Value(10256)
                                    .TextAlign(SpreadsheetTextAlign.Center);
				
                                cells.Add()
            		                    .Value(new DateTime(114, 6, 2))                
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
            		                    .Value(new DateTime(114, 6, 2, 15, 15, 0))                
                                    .Format("hh:mm")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value("Hannah Watson")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value("Excella")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value("regular")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value(0.01)
                                    .Format("0%")
                                    .TextAlign(SpreadsheetTextAlign.Center);
                            });
  
  	
    
  	                    rows.Add()
                            .Cells(cells =>
                            {
                                cells.Add()
                                    .Value(10257)
                                    .TextAlign(SpreadsheetTextAlign.Center);
				
                                cells.Add()
            		                    .Value(new DateTime(114, 6, 2))                
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
            		                    .Value(new DateTime(114, 6, 2, 18, 7, 0))                
                                    .Format("hh:mm")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value("Gregory Morrison")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value("Webcom Services")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value("2 days")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value(0.04)
                                    .Format("0%")
                                    .TextAlign(SpreadsheetTextAlign.Center);
                            });
  
  	
    
  	                    rows.Add()
                            .Cells(cells =>
                            {
                                cells.Add()
                                    .Value(10258)
                                    .TextAlign(SpreadsheetTextAlign.Center);
				
                                cells.Add()
            		                    .Value(new DateTime(114, 6, 2))                
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
            		                    .Value(new DateTime(114, 6, 2, 8, 44, 0))                
                                    .Format("hh:mm")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value("Joe Lawrence")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value("Complete Tech")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value("1 day")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value(0)
                                    .Format("0%")
                                    .TextAlign(SpreadsheetTextAlign.Center);
                            });
  
  	
    
  	                    rows.Add()
                            .Cells(cells =>
                            {
                                cells.Add()
                                    .Value(10249)
                                    .TextAlign(SpreadsheetTextAlign.Center);
				
                                cells.Add()
            		                    .Value(new DateTime(114, 6, 1))                
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
            		                    .Value(new DateTime(114, 6, 1, 8, 44, 0))                
                                    .Format("hh:mm")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value("Edward Hall")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value("Zig Zag Coder")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value("regular")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value(0.08)
                                    .Format("0%")
                                    .TextAlign(SpreadsheetTextAlign.Center);
                            });
  
  	
    
  	                    rows.Add()
                            .Cells(cells =>
                            {
                                cells.Add()
                                    .Value(10260)
                                    .TextAlign(SpreadsheetTextAlign.Center);
				
                                cells.Add()
            		                    .Value(new DateTime(114, 6, 2))                
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
            		                    .Value(new DateTime(114, 6, 2, 14, 13, 0))                
                                    .Format("hh:mm")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value("Glenda White")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value("Webcom Services")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value("regular")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value(0.05)
                                    .Format("0%")
                                    .TextAlign(SpreadsheetTextAlign.Center);
                            });
  
  	
    
  	                    rows.Add()
                            .Cells(cells =>
                            {
                                cells.Add()
                                    .Value(10261)
                                    .TextAlign(SpreadsheetTextAlign.Center);
				
                                cells.Add()
            		                    .Value(new DateTime(114, 6, 2))                
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
            		                    .Value(new DateTime(114, 6, 2, 16, 57, 0))                
                                    .Format("hh:mm")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value("Lynda Evans")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value("Complete Tech")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value("1 day")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value(0.01)
                                    .Format("0%")
                                    .TextAlign(SpreadsheetTextAlign.Center);
                            });
  
  	
    
  	                    rows.Add()
                            .Cells(cells =>
                            {
                                cells.Add()
                                    .Value(10262)
                                    .TextAlign(SpreadsheetTextAlign.Center);
				
                                cells.Add()
            		                    .Value(new DateTime(114, 6, 2))                
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
            		                    .Value(new DateTime(114, 6, 2, 8, 48, 0))                
                                    .Format("hh:mm")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value("Edward Hall")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value("Zig Zag Coder")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value("2 days")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value(0.04)
                                    .Format("0%")
                                    .TextAlign(SpreadsheetTextAlign.Center);
                            });
  
  	
    
  	                    rows.Add()
                            .Cells(cells =>
                            {
                                cells.Add()
                                    .Value(10250)
                                    .TextAlign(SpreadsheetTextAlign.Center);
				
                                cells.Add()
            		                    .Value(new DateTime(114, 6, 1))                
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
            		                    .Value(new DateTime(114, 6, 1, 11, 28, 0))                
                                    .Format("hh:mm")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value("Jerry Wright")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value("Integra Design")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value("regular")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value(0.08)
                                    .Format("0%")
                                    .TextAlign(SpreadsheetTextAlign.Center);
                            });
  
  	
    
  	                    rows.Add()
                            .Cells(cells =>
                            {
                                cells.Add()
                                    .Value(10264)
                                    .TextAlign(SpreadsheetTextAlign.Center);
				
                                cells.Add()
            		                    .Value(new DateTime(114, 6, 2))                
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
            		                    .Value(new DateTime(114, 6, 2, 13, 51, 0))                
                                    .Format("hh:mm")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value("Jerry Wright")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value("Integra Design")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value("2 days")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value(0)
                                    .Format("0%")
                                    .TextAlign(SpreadsheetTextAlign.Center);
                            });
  
  	
    
  	                    rows.Add()
                            .Cells(cells =>
                            {
                                cells.Add()
                                    .Value(10263)
                                    .TextAlign(SpreadsheetTextAlign.Center);
				
                                cells.Add()
            		                    .Value(new DateTime(114, 6, 2))                
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
            		                    .Value(new DateTime(114, 6, 2, 9, 7, 0))                
                                    .Format("hh:mm")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value("Charles Miller")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value("Complete Tech")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value("regular")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value(0.1)
                                    .Format("0%")
                                    .TextAlign(SpreadsheetTextAlign.Center);
                            });
  
  	
    
  	                    rows.Add()
                            .Cells(cells =>
                            {
                                cells.Add()
                                    .Value(10266)
                                    .TextAlign(SpreadsheetTextAlign.Center);
				
                                cells.Add()
            		                    .Value(new DateTime(114, 6, 2))                
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
            		                    .Value(new DateTime(114, 6, 2, 17, 20, 0))                
                                    .Format("hh:mm")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value("Alison Ross")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value("Excella")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value("express")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value(0.02)
                                    .Format("0%")
                                    .TextAlign(SpreadsheetTextAlign.Center);
                            });
  
  	
    
  	                    rows.Add()
                            .Cells(cells =>
                            {
                                cells.Add()
                                    .Value(10267)
                                    .TextAlign(SpreadsheetTextAlign.Center);
				
                                cells.Add()
            		                    .Value(new DateTime(114, 6, 2))                
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
            		                    .Value(new DateTime(114, 6, 2, 8, 4, 0))                
                                    .Format("hh:mm")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value("Alexandra Kennedy")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value("Webcom Services")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value("regular")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value(0.05)
                                    .Format("0%")
                                    .TextAlign(SpreadsheetTextAlign.Center);
                            });
  
  	
    
  	                    rows.Add()
                            .Cells(cells =>
                            {
                                cells.Add()
                                    .Value(10268)
                                    .TextAlign(SpreadsheetTextAlign.Center);
				
                                cells.Add()
            		                    .Value(new DateTime(114, 6, 2))                
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
            		                    .Value(new DateTime(114, 6, 2, 10, 49, 0))                
                                    .Format("hh:mm")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value("Agnes Hill")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value("Integra Design")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value("1 day")
                                    .TextAlign(SpreadsheetTextAlign.Center);

                                cells.Add()
                                    .Value(0)
                                    .Format("0%")
                                    .TextAlign(SpreadsheetTextAlign.Center);
                            });
  
  
                   
                });
        })
    %>

</div>
</asp:Content>
