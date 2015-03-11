using Microsoft.Data.Entity.Relational.Migrations;
using Microsoft.Data.Entity.Relational.Migrations.Builders;
using Microsoft.Data.Entity.Relational.Migrations.MigrationsModel;
using System;

namespace Kendo.Mvc.Examples.Migrations
{
    public partial class initial : Migration
    {
        public override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable("Category",
                c => new
                    {
                        CategoryID = c.Int(nullable: false, identity: true),
                        CategoryName = c.String(),
                        Description = c.String(),
                        Picture = c.Binary()
                    })
                .PrimaryKey("PK_Category", t => t.CategoryID);
            
            migrationBuilder.CreateTable("Customer",
                c => new
                    {
                        CustomerID = c.String(),
                        Address = c.String(),
                        Bool = c.Boolean(),
                        City = c.String(),
                        CompanyName = c.String(),
                        ContactName = c.String(),
                        ContactTitle = c.String(),
                        Country = c.String(),
                        Fax = c.String(),
                        Phone = c.String(),
                        PostalCode = c.String(),
                        Region = c.String(),
                        CustomerDemographicId = c.String()
                    })
                .PrimaryKey("PK_Customer", t => t.CustomerID);
            
            migrationBuilder.CreateTable("CustomerDemographic",
                c => new
                    {
                        CustomerTypeID = c.String(),
                        CustomerDesc = c.String()
                    })
                .PrimaryKey("PK_CustomerDemographic", t => t.CustomerTypeID);
            
            migrationBuilder.CreateTable("Employee",
                c => new
                    {
                        EmployeeID = c.Int(nullable: false, identity: true),
                        Address = c.String(),
                        BirthDate = c.DateTime(),
                        City = c.String(),
                        Country = c.String(),
                        Extension = c.String(),
                        FirstName = c.String(),
                        HireDate = c.DateTime(),
                        HomePhone = c.String(),
                        LastName = c.String(),
                        Notes = c.String(),
                        Photo = c.Binary(),
                        PhotoPath = c.String(),
                        PostalCode = c.String(),
                        Region = c.String(),
                        ReportsTo = c.Int(),
                        Title = c.String(),
                        TitleOfCourtesy = c.String()
                    })
                .PrimaryKey("PK_Employee", t => t.EmployeeID);
            
            migrationBuilder.CreateTable("EmployeeDirectory",
                c => new
                    {
                        EmployeeID = c.Int(nullable: false),
                        Address = c.String(),
                        BirthDate = c.DateTime(),
                        City = c.String(),
                        Country = c.String(),
                        Extension = c.Int(),
                        FirstName = c.String(),
                        HireDate = c.DateTime(),
                        LastName = c.String(),
                        Phone = c.String(),
                        Position = c.String(),
                        ReportsTo = c.Int(),
                        EmployeeDirectoryId = c.Int()
                    })
                .PrimaryKey("PK_EmployeeDirectory", t => t.EmployeeID);
            
            migrationBuilder.CreateTable("GanttDependency",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        PredecessorID = c.Int(nullable: false),
                        SuccessorID = c.Int(nullable: false),
                        Type = c.Int(nullable: false)
                    })
                .PrimaryKey("PK_GanttDependency", t => t.ID);
            
            migrationBuilder.CreateTable("GanttResource",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        Color = c.String(),
                        Name = c.String()
                    })
                .PrimaryKey("PK_GanttResource", t => t.ID);
            
            migrationBuilder.CreateTable("GanttResourceAssignment",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        ResourceID = c.Int(nullable: false),
                        TaskID = c.Int(nullable: false),
                        Units = c.Decimal(nullable: false)
                    })
                .PrimaryKey("PK_GanttResourceAssignment", t => t.ID);
            
            migrationBuilder.CreateTable("GanttTask",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        End = c.DateTime(nullable: false),
                        Expanded = c.Boolean(nullable: false),
                        OrderID = c.Int(nullable: false),
                        ParentID = c.Int(),
                        PercentComplete = c.Decimal(nullable: false),
                        Start = c.DateTime(nullable: false),
                        Summary = c.Boolean(nullable: false),
                        Title = c.String(),
                        GanttTaskId = c.Int()
                    })
                .PrimaryKey("PK_GanttTask", t => t.ID);
            
            migrationBuilder.CreateTable("Intraday",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        Close = c.Decimal(nullable: false),
                        Date = c.DateTime(nullable: false),
                        High = c.Decimal(nullable: false),
                        Low = c.Decimal(nullable: false),
                        Open = c.Decimal(nullable: false),
                        Symbol = c.String(),
                        Volume = c.Long(nullable: false)
                    })
                .PrimaryKey("PK_Intraday", t => t.ID);
            
            migrationBuilder.CreateTable("Meeting",
                c => new
                    {
                        MeetingID = c.Int(nullable: false, identity: true),
                        Description = c.String(),
                        End = c.DateTime(nullable: false),
                        EndTimezone = c.String(),
                        IsAllDay = c.Boolean(nullable: false),
                        RecurrenceException = c.String(),
                        RecurrenceID = c.Int(),
                        RecurrenceRule = c.String(),
                        RoomID = c.Int(),
                        Start = c.DateTime(nullable: false),
                        StartTimezone = c.String(),
                        Title = c.String()
                    })
                .PrimaryKey("PK_Meeting", t => t.MeetingID);
            
            migrationBuilder.CreateTable("MeetingAttendee",
                c => new
                    {
                        AttendeeID = c.Int(nullable: false),
                        MeetingID = c.Int(nullable: false)
                    })
                .PrimaryKey("PK_MeetingAttendee", t => t.AttendeeID);
            
            migrationBuilder.CreateTable("Order",
                c => new
                    {
                        OrderID = c.Int(nullable: false, identity: true),
                        EmployeeID = c.Int(),
                        Freight = c.Decimal(),
                        OrderDate = c.DateTime(),
                        RequiredDate = c.DateTime(),
                        ShipAddress = c.String(),
                        ShipCity = c.String(),
                        ShipCountry = c.String(),
                        ShipName = c.String(),
                        ShippedDate = c.DateTime(),
                        ShipPostalCode = c.String(),
                        ShipRegion = c.String(),
                        ShipVia = c.Int(),
                        CustomerID = c.String(),
                        ShipperId = c.Int()
                    })
                .PrimaryKey("PK_Order", t => t.OrderID);
            
            migrationBuilder.CreateTable("Order_Detail",
                c => new
                    {
                        ProductID = c.Int(nullable: false),
                        Discount = c.Single(nullable: false),
                        Quantity = c.Short(nullable: false),
                        UnitPrice = c.Decimal(nullable: false),
                        OrderID = c.Int(nullable: false)
                    })
                .PrimaryKey("PK_Order_Detail", t => t.ProductID);
            
            migrationBuilder.CreateTable("OrgChartConnection",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        FromPointX = c.Int(),
                        FromPointY = c.Int(),
                        FromShapeId = c.Int(),
                        Text = c.String(),
                        ToPointX = c.Int(),
                        ToPointY = c.Int(),
                        ToShapeId = c.Int()
                    })
                .PrimaryKey("PK_OrgChartConnection", t => t.Id);
            
            migrationBuilder.CreateTable("OrgChartShape",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Color = c.String(),
                        JobTitle = c.String()
                    })
                .PrimaryKey("PK_OrgChartShape", t => t.Id);
            
            migrationBuilder.CreateTable("Product",
                c => new
                    {
                        ProductID = c.Int(nullable: false, identity: true),
                        Discontinued = c.Boolean(nullable: false),
                        ProductName = c.String(),
                        QuantityPerUnit = c.String(),
                        ReorderLevel = c.Short(),
                        UnitPrice = c.Decimal(),
                        UnitsInStock = c.Short(),
                        UnitsOnOrder = c.Short(),
                        SupplierID = c.Int(),
                        CategoryID = c.Int()
                    })
                .PrimaryKey("PK_Product", t => t.ProductID);
            
            migrationBuilder.CreateTable("Region",
                c => new
                    {
                        RegionID = c.Int(nullable: false, identity: true),
                        RegionDescription = c.String()
                    })
                .PrimaryKey("PK_Region", t => t.RegionID);
            
            migrationBuilder.CreateTable("Shipper",
                c => new
                    {
                        ShipperID = c.Int(nullable: false, identity: true),
                        CompanyName = c.String(),
                        Phone = c.String()
                    })
                .PrimaryKey("PK_Shipper", t => t.ShipperID);
            
            migrationBuilder.CreateTable("Stock",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        Close = c.Decimal(nullable: false),
                        Date = c.DateTime(nullable: false),
                        High = c.Decimal(nullable: false),
                        Low = c.Decimal(nullable: false),
                        Open = c.Decimal(nullable: false),
                        Symbol = c.String(),
                        Volume = c.Long(nullable: false)
                    })
                .PrimaryKey("PK_Stock", t => t.ID);
            
            migrationBuilder.CreateTable("Supplier",
                c => new
                    {
                        SupplierID = c.Int(nullable: false, identity: true),
                        Address = c.String(),
                        City = c.String(),
                        CompanyName = c.String(),
                        ContactName = c.String(),
                        ContactTitle = c.String(),
                        Country = c.String(),
                        Fax = c.String(),
                        HomePage = c.String(),
                        Phone = c.String(),
                        PostalCode = c.String(),
                        Region = c.String()
                    })
                .PrimaryKey("PK_Supplier", t => t.SupplierID);
            
            migrationBuilder.CreateTable("Task",
                c => new
                    {
                        TaskID = c.Int(nullable: false, identity: true),
                        Description = c.String(),
                        End = c.DateTime(nullable: false),
                        EndTimezone = c.String(),
                        IsAllDay = c.Boolean(nullable: false),
                        OwnerID = c.Int(),
                        RecurrenceException = c.String(),
                        RecurrenceID = c.Int(),
                        RecurrenceRule = c.String(),
                        Start = c.DateTime(nullable: false),
                        StartTimezone = c.String(),
                        Title = c.String()
                    })
                .PrimaryKey("PK_Task", t => t.TaskID);
            
            migrationBuilder.CreateTable("Territory",
                c => new
                    {
                        TerritoryID = c.String(),
                        TerritoryDescription = c.String(),
                        RegionID = c.Int(nullable: false),
                        EmployeeId = c.Int()
                    })
                .PrimaryKey("PK_Territory", t => t.TerritoryID);
            
            migrationBuilder.CreateTable("UrbanArea",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        City = c.String(),
                        Country = c.String(),
                        Country_ISO3 = c.String(),
                        Latitude = c.Decimal(nullable: false),
                        Longitude = c.Decimal(nullable: false),
                        Pop1950 = c.Int(nullable: false),
                        Pop1955 = c.Int(nullable: false),
                        Pop1960 = c.Int(nullable: false),
                        Pop1965 = c.Int(nullable: false),
                        Pop1970 = c.Int(nullable: false),
                        Pop1975 = c.Int(nullable: false),
                        Pop1980 = c.Int(nullable: false),
                        Pop1985 = c.Int(nullable: false),
                        Pop1990 = c.Int(nullable: false),
                        Pop1995 = c.Int(nullable: false),
                        Pop2000 = c.Int(nullable: false),
                        Pop2005 = c.Int(nullable: false),
                        Pop2010 = c.Int(nullable: false),
                        Pop2015 = c.Int(nullable: false),
                        Pop2020 = c.Int(nullable: false),
                        Pop2025 = c.Int(nullable: false),
                        Pop2050 = c.Int(nullable: false)
                    })
                .PrimaryKey("PK_UrbanArea", t => t.ID);
            
            migrationBuilder.CreateTable("Weather",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        Date = c.DateTime(nullable: false),
                        Events = c.String(),
                        Gust = c.Decimal(),
                        Rain = c.Decimal(nullable: false),
                        Snow = c.Decimal(),
                        Station = c.String(),
                        TMax = c.Decimal(nullable: false),
                        TMin = c.Decimal(nullable: false),
                        Wind = c.Decimal(nullable: false)
                    })
                .PrimaryKey("PK_Weather", t => t.ID);
            
            migrationBuilder.AddForeignKey(
                "Customer",
                "FK_Customer_CustomerDemographic_CustomerDemographicId",
                new[] { "CustomerDemographicId" },
                "CustomerDemographic",
                new[] { "CustomerTypeID" },
                cascadeDelete: false);
            
            migrationBuilder.AddForeignKey(
                "Employee",
                "FK_Employee_Employee_EmployeeID",
                new[] { "EmployeeID" },
                "Employee",
                new[] { "EmployeeID" },
                cascadeDelete: false);
            
            migrationBuilder.AddForeignKey(
                "EmployeeDirectory",
                "FK_EmployeeDirectory_EmployeeDirectory_EmployeeDirectoryId",
                new[] { "EmployeeDirectoryId" },
                "EmployeeDirectory",
                new[] { "EmployeeID" },
                cascadeDelete: false);
            
            migrationBuilder.AddForeignKey(
                "GanttTask",
                "FK_GanttTask_GanttTask_GanttTaskId",
                new[] { "GanttTaskId" },
                "GanttTask",
                new[] { "ID" },
                cascadeDelete: false);
            
            migrationBuilder.AddForeignKey(
                "Meeting",
                "FK_Meeting_Meeting_MeetingID",
                new[] { "MeetingID" },
                "Meeting",
                new[] { "MeetingID" },
                cascadeDelete: false);
            
            migrationBuilder.AddForeignKey(
                "MeetingAttendee",
                "FK_MeetingAttendee_Meeting_MeetingID",
                new[] { "MeetingID" },
                "Meeting",
                new[] { "MeetingID" },
                cascadeDelete: false);
            
            migrationBuilder.AddForeignKey(
                "Order",
                "FK_Order_Customer_CustomerID",
                new[] { "CustomerID" },
                "Customer",
                new[] { "CustomerID" },
                cascadeDelete: false);
            
            migrationBuilder.AddForeignKey(
                "Order",
                "FK_Order_Shipper_ShipperId",
                new[] { "ShipperId" },
                "Shipper",
                new[] { "ShipperID" },
                cascadeDelete: false);
            
            migrationBuilder.AddForeignKey(
                "Order_Detail",
                "FK_Order_Detail_Order_OrderID",
                new[] { "OrderID" },
                "Order",
                new[] { "OrderID" },
                cascadeDelete: false);
            
            migrationBuilder.AddForeignKey(
                "Order_Detail",
                "FK_Order_Detail_Product_ProductID",
                new[] { "ProductID" },
                "Product",
                new[] { "ProductID" },
                cascadeDelete: false);
            
            migrationBuilder.AddForeignKey(
                "Product",
                "FK_Product_Supplier_SupplierID",
                new[] { "SupplierID" },
                "Supplier",
                new[] { "SupplierID" },
                cascadeDelete: false);
            
            migrationBuilder.AddForeignKey(
                "Product",
                "FK_Product_Category_CategoryID",
                new[] { "CategoryID" },
                "Category",
                new[] { "CategoryID" },
                cascadeDelete: false);
            
            migrationBuilder.AddForeignKey(
                "Task",
                "FK_Task_Task_TaskID",
                new[] { "TaskID" },
                "Task",
                new[] { "TaskID" },
                cascadeDelete: false);
            
            migrationBuilder.AddForeignKey(
                "Territory",
                "FK_Territory_Region_RegionID",
                new[] { "RegionID" },
                "Region",
                new[] { "RegionID" },
                cascadeDelete: false);
            
            migrationBuilder.AddForeignKey(
                "Territory",
                "FK_Territory_Employee_EmployeeId",
                new[] { "EmployeeId" },
                "Employee",
                new[] { "EmployeeID" },
                cascadeDelete: false);
        }
        
        public override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey("Product", "FK_Product_Category_CategoryID");
            
            migrationBuilder.DropForeignKey("Order", "FK_Order_Customer_CustomerID");
            
            migrationBuilder.DropForeignKey("Customer", "FK_Customer_CustomerDemographic_CustomerDemographicId");
            
            migrationBuilder.DropForeignKey("Employee", "FK_Employee_Employee_EmployeeID");
            
            migrationBuilder.DropForeignKey("Territory", "FK_Territory_Employee_EmployeeId");
            
            migrationBuilder.DropForeignKey("EmployeeDirectory", "FK_EmployeeDirectory_EmployeeDirectory_EmployeeDirectoryId");
            
            migrationBuilder.DropForeignKey("GanttTask", "FK_GanttTask_GanttTask_GanttTaskId");
            
            migrationBuilder.DropForeignKey("Meeting", "FK_Meeting_Meeting_MeetingID");
            
            migrationBuilder.DropForeignKey("MeetingAttendee", "FK_MeetingAttendee_Meeting_MeetingID");
            
            migrationBuilder.DropForeignKey("Order_Detail", "FK_Order_Detail_Order_OrderID");
            
            migrationBuilder.DropForeignKey("Order_Detail", "FK_Order_Detail_Product_ProductID");
            
            migrationBuilder.DropForeignKey("Territory", "FK_Territory_Region_RegionID");
            
            migrationBuilder.DropForeignKey("Order", "FK_Order_Shipper_ShipperId");
            
            migrationBuilder.DropForeignKey("Product", "FK_Product_Supplier_SupplierID");
            
            migrationBuilder.DropForeignKey("Task", "FK_Task_Task_TaskID");
            
            migrationBuilder.DropTable("Category");
            
            migrationBuilder.DropTable("Customer");
            
            migrationBuilder.DropTable("CustomerDemographic");
            
            migrationBuilder.DropTable("Employee");
            
            migrationBuilder.DropTable("EmployeeDirectory");
            
            migrationBuilder.DropTable("GanttDependency");
            
            migrationBuilder.DropTable("GanttResource");
            
            migrationBuilder.DropTable("GanttResourceAssignment");
            
            migrationBuilder.DropTable("GanttTask");
            
            migrationBuilder.DropTable("Intraday");
            
            migrationBuilder.DropTable("Meeting");
            
            migrationBuilder.DropTable("MeetingAttendee");
            
            migrationBuilder.DropTable("Order");
            
            migrationBuilder.DropTable("Order_Detail");
            
            migrationBuilder.DropTable("OrgChartConnection");
            
            migrationBuilder.DropTable("OrgChartShape");
            
            migrationBuilder.DropTable("Product");
            
            migrationBuilder.DropTable("Region");
            
            migrationBuilder.DropTable("Shipper");
            
            migrationBuilder.DropTable("Stock");
            
            migrationBuilder.DropTable("Supplier");
            
            migrationBuilder.DropTable("Task");
            
            migrationBuilder.DropTable("Territory");
            
            migrationBuilder.DropTable("UrbanArea");
            
            migrationBuilder.DropTable("Weather");
        }
    }
}