<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">

<script src="//cdnjs.cloudflare.com/ajax/libs/jszip/2.4.0/jszip.min.js"></script>

<div id="example">
<%:Html.Kendo().Spreadsheet()
    .Name("spreadsheet")
    .HtmlAttributes(new { style = "width:100%" })
    .Rows(9)
    .Columns(5)
    .Sheetsbar(false)
    .Sheets(sheets =>
    {
        sheets.Add()
            .Name("ContactsForm")
            .MergedCells("A1:E1")
            .Columns(columns =>
            {
                columns.Add().Width(100);
                columns.Add().Width(215);
                columns.Add().Width(115);
                columns.Add().Width(115);
                columns.Add().Width(115);
                columns.Add().Width(155);
            })
            .Rows(rows =>
            {
                rows.Add()
                    .Height(70)
                    .Cells(cells => cells
                        .Add()
                        .Index(0)
                        .Value("CONTACTS FORM")
                        .FontSize(32)
                        .Background("rgb(96,181,255)")
                        .Enable(false)
                        .TextAlign(SpreadsheetTextAlign.Center)
                        .Color("white"));

                rows.Add()
                    .Height(25)
                    .Cells(cells => {
                        cells.Add()
                            .Value("Full Name")
                            .Background("rgb(167,214,255)")
                            .TextAlign(SpreadsheetTextAlign.Center)
                            .Color("rgb(0,62,117)")
                            .Enable(false);

                        cells.Add()
                            .Value("Email")
                            .Background("rgb(167,214,255)")
                            .TextAlign(SpreadsheetTextAlign.Center)
                            .Color("rgb(0,62,117)")
                            .Enable(false);

                        cells.Add()
                            .Value("Date of Birth")
                            .Background("rgb(167,214,255)")
                            .TextAlign(SpreadsheetTextAlign.Center)
                            .Color("rgb(0,62,117)")
                            .Enable(false);

                        cells.Add()
                            .Value("Phone")
                            .Background("rgb(167,214,255)")
                            .TextAlign(SpreadsheetTextAlign.Center)
                            .Color("rgb(0,62,117)")
                            .Enable(false);

                        cells.Add()
                            .Value("Confirmed")
                            .Background("rgb(167,214,255)")
                            .TextAlign(SpreadsheetTextAlign.Center)
                            .Color("rgb(0,62,117)")
                            .Enable(false);
                    });

                rows.Add()
                    .Height(25)
                    .Cells(cells => {
                        cells.Add()
                            .Value("Peter Pan")
                            .Validation(validation => validation
                                .DataType("custom")
                                .From("AND(LEN(A3)>3, LEN(A3)200)")
                                .AllowNulls(true)
                                .Type("reject")
                                .TitleTemplate("Full Name validation error")
                                .MessageTemplate("The full name should be longer than 3 letters and shorter than 200."));

                        cells.Add()
                            .Value("PeterPan@Gmail.com")
                            .Validation(validation => validation
                                .DataType("custom")
                                .From("AND(NOT(ISERROR(FIND(\"@\", B3))), NOT(ISERROR(FIND(\".\", B3))), ISERROR(FIND(\" \", J1)), LEN(B3)>5)")
                                .AllowNulls(true)
                                .Type("reject")
                                .TitleTemplate("Email validation error")
                                .MessageTemplate("The value entered is not an valid email address."));

                        cells.Add()
                           .Value(35431)
                           .Format("m/d/yyyy")
                           .Validation(validation => validation
                               .DataType("date")
                               .ComparerType("between")
                               .From("DATEVALUE(\"1/1/1900\")")
                               .To("DATEVALUE(\"1/1/1998\")")
                               .AllowNulls(true)
                               .Type("reject")
                               .TitleTemplate("Birth Date validaiton error")
                               .MessageTemplate("Birth Date should be between 1899 and 1998 year."));

                        cells.Add()
                           .Value(359887699774)
                           .Validation(validation => validation
                               .DataType("custom")
                               .From("AND(ISNUMBER(D3),LEN(D3)<14)")
                               .AllowNulls(true)
                               .Type("reject")
                               .TitleTemplate("Phone validation error")
                               .MessageTemplate("The value entered is not an valid phone number. Please enter numeric value with less than 14 digits."));

                        cells.Add()
                         .Value(true)
                         .Validation(validation => validation
                             .DataType("list")
                             .From("ListValues!A1:B1")
                             .AllowNulls(true)
                             .Type("reject")
                             .TitleTemplate("Invalid value")
                             .MessageTemplate("Valid values are 'true' and 'false'."));
                    });

                rows.Add()
                    .Height(25)
                    .Cells(cells =>
                    {
                        cells.Add()
                            .Value("")
                            .Validation(validation => validation
                                .DataType("custom")
                                .From("AND(LEN(A3)>3, LEN(A3)200)")
                                .AllowNulls(true)
                                .Type("reject")
                                .TitleTemplate("Full Name validation error")
                                .MessageTemplate("The full name should be longer than 3 letters and shorter than 200."));

                        cells.Add()
                            .Value("")
                            .Validation(validation => validation
                                .DataType("custom")
                                .From("AND(NOT(ISERROR(FIND(\"@\", B3))), NOT(ISERROR(FIND(\".\", B3))), ISERROR(FIND(\" \", J1)), LEN(B3)>5)")
                                .AllowNulls(true)
                                .Type("reject")
                                .TitleTemplate("Email validation error")
                                .MessageTemplate("The value entered is not an valid email address."));

                        cells.Add()
                           .Value("")
                           .Format("m/d/yyyy")
                           .Validation(validation => validation
                               .DataType("date")
                               .ComparerType("between")
                               .From("DATEVALUE(\"1/1/1900\")")
                               .To("DATEVALUE(\"1/1/1998\")")
                               .AllowNulls(true)
                               .Type("reject")
                               .TitleTemplate("Birth Date validaiton error")
                               .MessageTemplate("Birth Date should be between 1899 and 1998 year."));

                        cells.Add()
                           .Value("")
                           .Validation(validation => validation
                               .DataType("custom")
                               .From("AND(ISNUMBER(D3),LEN(D3)<14)")
                               .AllowNulls(true)
                               .Type("reject")
                               .TitleTemplate("Phone validation error")
                               .MessageTemplate("The value entered is not an valid phone number. Please enter numeric value with less than 14 digits."));

                        cells.Add()
                         .Value("")
                         .Validation(validation => validation
                             .DataType("list")
                             .From("ListValues!A1:B1")
                             .AllowNulls(true)
                             .Type("reject")
                             .TitleTemplate("Invalid value")
                             .MessageTemplate("Valid values are 'true' and 'false'."));
                    });

                rows.Add()
                    .Height(25)
                    .Cells(cells =>
                    {
                        cells.Add()
                            .Value("")
                            .Validation(validation => validation
                                .DataType("custom")
                                .From("AND(LEN(A3)>3, LEN(A3)200)")
                                .AllowNulls(true)
                                .Type("reject")
                                .TitleTemplate("Full Name validation error")
                                .MessageTemplate("The full name should be longer than 3 letters and shorter than 200."));

                        cells.Add()
                            .Value("")
                            .Validation(validation => validation
                                .DataType("custom")
                                .From("AND(NOT(ISERROR(FIND(\"@\", B3))), NOT(ISERROR(FIND(\".\", B3))), ISERROR(FIND(\" \", J1)), LEN(B3)>5)")
                                .AllowNulls(true)
                                .Type("reject")
                                .TitleTemplate("Email validation error")
                                .MessageTemplate("The value entered is not an valid email address."));

                        cells.Add()
                           .Value("")
                           .Format("m/d/yyyy")
                           .Validation(validation => validation
                               .DataType("date")
                               .ComparerType("between")
                               .From("DATEVALUE(\"1/1/1900\")")
                               .To("DATEVALUE(\"1/1/1998\")")
                               .AllowNulls(true)
                               .Type("reject")
                               .TitleTemplate("Birth Date validaiton error")
                               .MessageTemplate("Birth Date should be between 1899 and 1998 year."));

                        cells.Add()
                           .Value("")
                           .Validation(validation => validation
                               .DataType("custom")
                               .From("AND(ISNUMBER(D3),LEN(D3)<14)")
                               .AllowNulls(true)
                               .Type("reject")
                               .TitleTemplate("Phone validation error")
                               .MessageTemplate("The value entered is not an valid phone number. Please enter numeric value with less than 14 digits."));

                        cells.Add()
                         .Value("")
                         .Validation(validation => validation
                             .DataType("list")
                             .From("ListValues!A1:B1")
                             .AllowNulls(true)
                             .Type("reject")
                             .TitleTemplate("Invalid value")
                             .MessageTemplate("Valid values are 'true' and 'false'."));

                    });

                rows.Add()
                    .Height(25)
                    .Cells(cells =>
                    {
                        cells.Add()
                            .Value("")
                            .Validation(validation => validation
                                .DataType("custom")
                                .From("AND(LEN(A3)>3, LEN(A3)200)")
                                .AllowNulls(true)
                                .Type("reject")
                                .TitleTemplate("Full Name validation error")
                                .MessageTemplate("The full name should be longer than 3 letters and shorter than 200."));

                        cells.Add()
                            .Value("")
                            .Validation(validation => validation
                                .DataType("custom")
                                .From("AND(NOT(ISERROR(FIND(\"@\", B3))), NOT(ISERROR(FIND(\".\", B3))), ISERROR(FIND(\" \", J1)), LEN(B3)>5)")
                                .AllowNulls(true)
                                .Type("reject")
                                .TitleTemplate("Email validation error")
                                .MessageTemplate("The value entered is not an valid email address."));

                        cells.Add()
                           .Value("")
                           .Format("m/d/yyyy")
                           .Validation(validation => validation
                               .DataType("date")
                               .ComparerType("between")
                               .From("DATEVALUE(\"1/1/1900\")")
                               .To("DATEVALUE(\"1/1/1998\")")
                               .AllowNulls(true)
                               .Type("reject")
                               .TitleTemplate("Birth Date validaiton error")
                               .MessageTemplate("Birth Date should be between 1899 and 1998 year."));

                        cells.Add()
                           .Value("")
                           .Validation(validation => validation
                               .DataType("custom")
                               .From("AND(ISNUMBER(D3),LEN(D3)<14)")
                               .AllowNulls(true)
                               .Type("reject")
                               .TitleTemplate("Phone validation error")
                               .MessageTemplate("The value entered is not an valid phone number. Please enter numeric value with less than 14 digits."));

                        cells.Add()
                         .Value("")
                         .Validation(validation => validation
                             .DataType("list")
                             .From("ListValues!A1:B1")
                             .AllowNulls(true)
                             .Type("reject")
                             .TitleTemplate("Invalid value")
                             .MessageTemplate("Valid values are 'true' and 'false'."));

                    });

                rows.Add()
                    .Height(25)
                    .Cells(cells =>
                    {
                        cells.Add()
                            .Value("")
                            .Validation(validation => validation
                                .DataType("custom")
                                .From("AND(LEN(A3)>3, LEN(A3)200)")
                                .AllowNulls(true)
                                .Type("reject")
                                .TitleTemplate("Full Name validation error")
                                .MessageTemplate("The full name should be longer than 3 letters and shorter than 200."));

                        cells.Add()
                            .Value("")
                            .Validation(validation => validation
                                .DataType("custom")
                                .From("AND(NOT(ISERROR(FIND(\"@\", B3))), NOT(ISERROR(FIND(\".\", B3))), ISERROR(FIND(\" \", J1)), LEN(B3)>5)")
                                .AllowNulls(true)
                                .Type("reject")
                                .TitleTemplate("Email validation error")
                                .MessageTemplate("The value entered is not an valid email address."));

                        cells.Add()
                           .Value("")
                           .Format("m/d/yyyy")
                           .Validation(validation => validation
                               .DataType("date")
                               .ComparerType("between")
                               .From("DATEVALUE(\"1/1/1900\")")
                               .To("DATEVALUE(\"1/1/1998\")")
                               .AllowNulls(true)
                               .Type("reject")
                               .TitleTemplate("Birth Date validaiton error")
                               .MessageTemplate("Birth Date should be between 1899 and 1998 year."));

                        cells.Add()
                           .Value("")
                           .Validation(validation => validation
                               .DataType("custom")
                               .From("AND(ISNUMBER(D3),LEN(D3)<14)")
                               .AllowNulls(true)
                               .Type("reject")
                               .TitleTemplate("Phone validation error")
                               .MessageTemplate("The value entered is not an valid phone number. Please enter numeric value with less than 14 digits."));

                        cells.Add()
                         .Value("")
                         .Validation(validation => validation
                             .DataType("list")
                             .From("ListValues!A1:B1")
                             .AllowNulls(true)
                             .Type("reject")
                             .TitleTemplate("Invalid value")
                             .MessageTemplate("Valid values are 'true' and 'false'."));

                    });

                rows.Add()
                    .Height(25)
                    .Cells(cells =>
                    {
                        cells.Add()
                            .Value("")
                            .Validation(validation => validation
                                .DataType("custom")
                                .From("AND(LEN(A3)>3, LEN(A3)200)")
                                .AllowNulls(true)
                                .Type("reject")
                                .TitleTemplate("Full Name validation error")
                                .MessageTemplate("The full name should be longer than 3 letters and shorter than 200."));

                        cells.Add()
                            .Value("")
                            .Validation(validation => validation
                                .DataType("custom")
                                .From("AND(NOT(ISERROR(FIND(\"@\", B3))), NOT(ISERROR(FIND(\".\", B3))), ISERROR(FIND(\" \", J1)), LEN(B3)>5)")
                                .AllowNulls(true)
                                .Type("reject")
                                .TitleTemplate("Email validation error")
                                .MessageTemplate("The value entered is not an valid email address."));

                        cells.Add()
                           .Value("")
                           .Format("m/d/yyyy")
                           .Validation(validation => validation
                               .DataType("date")
                               .ComparerType("between")
                               .From("DATEVALUE(\"1/1/1900\")")
                               .To("DATEVALUE(\"1/1/1998\")")
                               .AllowNulls(true)
                               .Type("reject")
                               .TitleTemplate("Birth Date validaiton error")
                               .MessageTemplate("Birth Date should be between 1899 and 1998 year."));

                        cells.Add()
                           .Value("")
                           .Validation(validation => validation
                               .DataType("custom")
                               .From("AND(ISNUMBER(D3),LEN(D3)<14)")
                               .AllowNulls(true)
                               .Type("reject")
                               .TitleTemplate("Phone validation error")
                               .MessageTemplate("The value entered is not an valid phone number. Please enter numeric value with less than 14 digits."));

                        cells.Add()
                         .Value("")
                         .Validation(validation => validation
                             .DataType("list")
                             .From("ListValues!A1:B1")
                             .AllowNulls(true)
                             .Type("reject")
                             .TitleTemplate("Invalid value")
                             .MessageTemplate("Valid values are 'true' and 'false'."));

                    });

                rows.Add()
                    .Height(25)
                    .Cells(cells =>
                    {
                        cells.Add()
                            .Value("")
                            .Validation(validation => validation
                                .DataType("custom")
                                .From("AND(LEN(A3)>3, LEN(A3)200)")
                                .AllowNulls(true)
                                .Type("reject")
                                .TitleTemplate("Full Name validation error")
                                .MessageTemplate("The full name should be longer than 3 letters and shorter than 200."));

                        cells.Add()
                            .Value("")
                            .Validation(validation => validation
                                .DataType("custom")
                                .From("AND(NOT(ISERROR(FIND(\"@\", B3))), NOT(ISERROR(FIND(\".\", B3))), ISERROR(FIND(\" \", J1)), LEN(B3)>5)")
                                .AllowNulls(true)
                                .Type("reject")
                                .TitleTemplate("Email validation error")
                                .MessageTemplate("The value entered is not an valid email address."));

                        cells.Add()
                           .Value("")
                           .Format("m/d/yyyy")
                           .Validation(validation => validation
                               .DataType("date")
                               .ComparerType("between")
                               .From("DATEVALUE(\"1/1/1900\")")
                               .To("DATEVALUE(\"1/1/1998\")")
                               .AllowNulls(true)
                               .Type("reject")
                               .TitleTemplate("Birth Date validaiton error")
                               .MessageTemplate("Birth Date should be between 1899 and 1998 year."));

                        cells.Add()
                           .Value("")
                           .Validation(validation => validation
                               .DataType("custom")
                               .From("AND(ISNUMBER(D3),LEN(D3)<14)")
                               .AllowNulls(true)
                               .Type("reject")
                               .TitleTemplate("Phone validation error")
                               .MessageTemplate("The value entered is not an valid phone number. Please enter numeric value with less than 14 digits."));

                        cells.Add()
                         .Value("")
                         .Validation(validation => validation
                             .DataType("list")
                             .From("ListValues!A1:B1")
                             .AllowNulls(true)
                             .Type("reject")
                             .TitleTemplate("Invalid value")
                             .MessageTemplate("Valid values are 'true' and 'false'."));

                    });
            });

            sheets.Add()
                .Name("ListValues")
                .Rows(rows => rows
                    .Add()
                    .Cells(cells =>
                    {
                        cells.Add()
                            .Value(true);
                        cells.Add()
                          .Value(false);
                    }));
    })

%>
</div>
</asp:Content>