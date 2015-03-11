using Kendo.Mvc.Examples.Models;
using Microsoft.Data.Entity;
using Microsoft.Data.Entity.Metadata;
using Microsoft.Data.Entity.Relational.Migrations.Infrastructure;
using System;

namespace Kendo.Mvc.Examples.Migrations
{
    [ContextType(typeof(Kendo.Mvc.Examples.Models.SampleEntitiesDataContext))]
    public partial class initial : IMigrationMetadata
    {
        string IMigrationMetadata.MigrationId
        {
            get
            {
                return "201503111012006_initial";
            }
        }
        
        string IMigrationMetadata.ProductVersion
        {
            get
            {
                return "7.0.0-beta3-12166";
            }
        }
        
        IModel IMigrationMetadata.TargetModel
        {
            get
            {
                var builder = new BasicModelBuilder();
                
                builder.Entity("Kendo.Mvc.Examples.Models.Category", b =>
                    {
                        b.Property<int>("CategoryID")
                            .GenerateValueOnAdd();
                        b.Property<string>("CategoryName");
                        b.Property<string>("Description");
                        b.Property<Byte[]>("Picture");
                        b.Key("CategoryID");
                    });
                
                builder.Entity("Kendo.Mvc.Examples.Models.Customer", b =>
                    {
                        b.Property<string>("Address");
                        b.Property<bool?>("Bool");
                        b.Property<string>("City");
                        b.Property<string>("CompanyName");
                        b.Property<string>("ContactName");
                        b.Property<string>("ContactTitle");
                        b.Property<string>("Country");
                        b.Property<string>("CustomerDemographicId");
                        b.Property<string>("CustomerID")
                            .GenerateValueOnAdd();
                        b.Property<string>("Fax");
                        b.Property<string>("Phone");
                        b.Property<string>("PostalCode");
                        b.Property<string>("Region");
                        b.Key("CustomerID");
                    });
                
                builder.Entity("Kendo.Mvc.Examples.Models.CustomerDemographic", b =>
                    {
                        b.Property<string>("CustomerDesc");
                        b.Property<string>("CustomerTypeID");
                        b.Key("CustomerTypeID");
                    });
                
                builder.Entity("Kendo.Mvc.Examples.Models.Employee", b =>
                    {
                        b.Property<string>("Address");
                        b.Property<DateTime?>("BirthDate");
                        b.Property<string>("City");
                        b.Property<string>("Country");
                        b.Property<int>("EmployeeID")
                            .GenerateValueOnAdd();
                        b.Property<string>("Extension");
                        b.Property<string>("FirstName");
                        b.Property<DateTime?>("HireDate");
                        b.Property<string>("HomePhone");
                        b.Property<string>("LastName");
                        b.Property<string>("Notes");
                        b.Property<Byte[]>("Photo");
                        b.Property<string>("PhotoPath");
                        b.Property<string>("PostalCode");
                        b.Property<string>("Region");
                        b.Property<int?>("ReportsTo");
                        b.Property<string>("Title");
                        b.Property<string>("TitleOfCourtesy");
                        b.Key("EmployeeID");
                    });
                
                builder.Entity("Kendo.Mvc.Examples.Models.EmployeeDirectory", b =>
                    {
                        b.Property<string>("Address");
                        b.Property<DateTime?>("BirthDate");
                        b.Property<string>("City");
                        b.Property<string>("Country");
                        b.Property<int?>("EmployeeDirectoryId");
                        b.Property<int>("EmployeeID");
                        b.Property<int?>("Extension");
                        b.Property<string>("FirstName");
                        b.Property<DateTime?>("HireDate");
                        b.Property<string>("LastName");
                        b.Property<string>("Phone");
                        b.Property<string>("Position");
                        b.Property<int?>("ReportsTo");
                        b.Key("EmployeeID");
                    });
                
                builder.Entity("Kendo.Mvc.Examples.Models.GanttDependency", b =>
                    {
                        b.Property<int>("ID")
                            .GenerateValueOnAdd();
                        b.Property<int>("PredecessorID");
                        b.Property<int>("SuccessorID");
                        b.Property<int>("Type");
                        b.Key("ID");
                    });
                
                builder.Entity("Kendo.Mvc.Examples.Models.GanttResource", b =>
                    {
                        b.Property<string>("Color");
                        b.Property<int>("ID")
                            .GenerateValueOnAdd();
                        b.Property<string>("Name");
                        b.Key("ID");
                    });
                
                builder.Entity("Kendo.Mvc.Examples.Models.GanttResourceAssignment", b =>
                    {
                        b.Property<int>("ID")
                            .GenerateValueOnAdd();
                        b.Property<int>("ResourceID");
                        b.Property<int>("TaskID");
                        b.Property<decimal>("Units");
                        b.Key("ID");
                    });
                
                builder.Entity("Kendo.Mvc.Examples.Models.GanttTask", b =>
                    {
                        b.Property<DateTime>("End");
                        b.Property<bool>("Expanded");
                        b.Property<int?>("GanttTaskId");
                        b.Property<int>("ID")
                            .GenerateValueOnAdd();
                        b.Property<int>("OrderID");
                        b.Property<int?>("ParentID");
                        b.Property<decimal>("PercentComplete");
                        b.Property<DateTime>("Start");
                        b.Property<bool>("Summary");
                        b.Property<string>("Title");
                        b.Key("ID");
                    });
                
                builder.Entity("Kendo.Mvc.Examples.Models.Intraday", b =>
                    {
                        b.Property<decimal>("Close");
                        b.Property<DateTime>("Date");
                        b.Property<decimal>("High");
                        b.Property<int>("ID")
                            .GenerateValueOnAdd();
                        b.Property<decimal>("Low");
                        b.Property<decimal>("Open");
                        b.Property<string>("Symbol");
                        b.Property<long>("Volume");
                        b.Key("ID");
                    });
                
                builder.Entity("Kendo.Mvc.Examples.Models.Meeting", b =>
                    {
                        b.Property<string>("Description");
                        b.Property<DateTime>("End");
                        b.Property<string>("EndTimezone");
                        b.Property<bool>("IsAllDay");
                        b.Property<int>("MeetingID")
                            .GenerateValueOnAdd();
                        b.Property<string>("RecurrenceException");
                        b.Property<int?>("RecurrenceID");
                        b.Property<string>("RecurrenceRule");
                        b.Property<int?>("RoomID");
                        b.Property<DateTime>("Start");
                        b.Property<string>("StartTimezone");
                        b.Property<string>("Title");
                        b.Key("MeetingID");
                    });
                
                builder.Entity("Kendo.Mvc.Examples.Models.MeetingAttendee", b =>
                    {
                        b.Property<int>("AttendeeID");
                        b.Property<int>("MeetingID");
                        b.Key("AttendeeID");
                    });
                
                builder.Entity("Kendo.Mvc.Examples.Models.Order", b =>
                    {
                        b.Property<string>("CustomerID");
                        b.Property<int?>("EmployeeID");
                        b.Property<decimal?>("Freight");
                        b.Property<DateTime?>("OrderDate");
                        b.Property<int>("OrderID")
                            .GenerateValueOnAdd();
                        b.Property<DateTime?>("RequiredDate");
                        b.Property<string>("ShipAddress");
                        b.Property<string>("ShipCity");
                        b.Property<string>("ShipCountry");
                        b.Property<string>("ShipName");
                        b.Property<string>("ShipPostalCode");
                        b.Property<string>("ShipRegion");
                        b.Property<int?>("ShipVia");
                        b.Property<DateTime?>("ShippedDate");
                        b.Property<int?>("ShipperId");
                        b.Key("OrderID");
                    });
                
                builder.Entity("Kendo.Mvc.Examples.Models.Order_Detail", b =>
                    {
                        b.Property<float>("Discount");
                        b.Property<int>("OrderID");
                        b.Property<int>("ProductID");
                        b.Property<short>("Quantity");
                        b.Property<decimal>("UnitPrice");
                        b.Key("ProductID");
                    });
                
                builder.Entity("Kendo.Mvc.Examples.Models.OrgChartConnection", b =>
                    {
                        b.Property<int?>("FromPointX");
                        b.Property<int?>("FromPointY");
                        b.Property<int?>("FromShapeId");
                        b.Property<int>("Id")
                            .GenerateValueOnAdd();
                        b.Property<string>("Text");
                        b.Property<int?>("ToPointX");
                        b.Property<int?>("ToPointY");
                        b.Property<int?>("ToShapeId");
                        b.Key("Id");
                    });
                
                builder.Entity("Kendo.Mvc.Examples.Models.OrgChartShape", b =>
                    {
                        b.Property<string>("Color");
                        b.Property<int>("Id")
                            .GenerateValueOnAdd();
                        b.Property<string>("JobTitle");
                        b.Key("Id");
                    });
                
                builder.Entity("Kendo.Mvc.Examples.Models.Product", b =>
                    {
                        b.Property<int?>("CategoryID");
                        b.Property<bool>("Discontinued");
                        b.Property<int>("ProductID")
                            .GenerateValueOnAdd();
                        b.Property<string>("ProductName");
                        b.Property<string>("QuantityPerUnit");
                        b.Property<short?>("ReorderLevel");
                        b.Property<int?>("SupplierID");
                        b.Property<decimal?>("UnitPrice");
                        b.Property<short?>("UnitsInStock");
                        b.Property<short?>("UnitsOnOrder");
                        b.Key("ProductID");
                    });
                
                builder.Entity("Kendo.Mvc.Examples.Models.Region", b =>
                    {
                        b.Property<string>("RegionDescription");
                        b.Property<int>("RegionID")
                            .GenerateValueOnAdd();
                        b.Key("RegionID");
                    });
                
                builder.Entity("Kendo.Mvc.Examples.Models.Shipper", b =>
                    {
                        b.Property<string>("CompanyName");
                        b.Property<string>("Phone");
                        b.Property<int>("ShipperID")
                            .GenerateValueOnAdd();
                        b.Key("ShipperID");
                    });
                
                builder.Entity("Kendo.Mvc.Examples.Models.Stock", b =>
                    {
                        b.Property<decimal>("Close");
                        b.Property<DateTime>("Date");
                        b.Property<decimal>("High");
                        b.Property<int>("ID")
                            .GenerateValueOnAdd();
                        b.Property<decimal>("Low");
                        b.Property<decimal>("Open");
                        b.Property<string>("Symbol");
                        b.Property<long>("Volume");
                        b.Key("ID");
                    });
                
                builder.Entity("Kendo.Mvc.Examples.Models.Supplier", b =>
                    {
                        b.Property<string>("Address");
                        b.Property<string>("City");
                        b.Property<string>("CompanyName");
                        b.Property<string>("ContactName");
                        b.Property<string>("ContactTitle");
                        b.Property<string>("Country");
                        b.Property<string>("Fax");
                        b.Property<string>("HomePage");
                        b.Property<string>("Phone");
                        b.Property<string>("PostalCode");
                        b.Property<string>("Region");
                        b.Property<int>("SupplierID")
                            .GenerateValueOnAdd();
                        b.Key("SupplierID");
                    });
                
                builder.Entity("Kendo.Mvc.Examples.Models.Task", b =>
                    {
                        b.Property<string>("Description");
                        b.Property<DateTime>("End");
                        b.Property<string>("EndTimezone");
                        b.Property<bool>("IsAllDay");
                        b.Property<int?>("OwnerID");
                        b.Property<string>("RecurrenceException");
                        b.Property<int?>("RecurrenceID");
                        b.Property<string>("RecurrenceRule");
                        b.Property<DateTime>("Start");
                        b.Property<string>("StartTimezone");
                        b.Property<int>("TaskID")
                            .GenerateValueOnAdd();
                        b.Property<string>("Title");
                        b.Key("TaskID");
                    });
                
                builder.Entity("Kendo.Mvc.Examples.Models.Territory", b =>
                    {
                        b.Property<int?>("EmployeeId");
                        b.Property<int>("RegionID");
                        b.Property<string>("TerritoryDescription");
                        b.Property<string>("TerritoryID")
                            .GenerateValueOnAdd();
                        b.Key("TerritoryID");
                    });
                
                builder.Entity("Kendo.Mvc.Examples.Models.UrbanArea", b =>
                    {
                        b.Property<string>("City");
                        b.Property<string>("Country");
                        b.Property<string>("Country_ISO3");
                        b.Property<int>("ID")
                            .GenerateValueOnAdd();
                        b.Property<decimal>("Latitude");
                        b.Property<decimal>("Longitude");
                        b.Property<int>("Pop1950");
                        b.Property<int>("Pop1955");
                        b.Property<int>("Pop1960");
                        b.Property<int>("Pop1965");
                        b.Property<int>("Pop1970");
                        b.Property<int>("Pop1975");
                        b.Property<int>("Pop1980");
                        b.Property<int>("Pop1985");
                        b.Property<int>("Pop1990");
                        b.Property<int>("Pop1995");
                        b.Property<int>("Pop2000");
                        b.Property<int>("Pop2005");
                        b.Property<int>("Pop2010");
                        b.Property<int>("Pop2015");
                        b.Property<int>("Pop2020");
                        b.Property<int>("Pop2025");
                        b.Property<int>("Pop2050");
                        b.Key("ID");
                    });
                
                builder.Entity("Kendo.Mvc.Examples.Models.Weather", b =>
                    {
                        b.Property<DateTime>("Date");
                        b.Property<string>("Events");
                        b.Property<decimal?>("Gust");
                        b.Property<int>("ID")
                            .GenerateValueOnAdd();
                        b.Property<decimal>("Rain");
                        b.Property<decimal?>("Snow");
                        b.Property<string>("Station");
                        b.Property<decimal>("TMax");
                        b.Property<decimal>("TMin");
                        b.Property<decimal>("Wind");
                        b.Key("ID");
                    });
                
                builder.Entity("Kendo.Mvc.Examples.Models.Customer", b =>
                    {
                        b.ForeignKey("Kendo.Mvc.Examples.Models.CustomerDemographic", "CustomerDemographicId");
                    });
                
                builder.Entity("Kendo.Mvc.Examples.Models.Employee", b =>
                    {
                        b.ForeignKey("Kendo.Mvc.Examples.Models.Employee", "EmployeeID");
                    });
                
                builder.Entity("Kendo.Mvc.Examples.Models.EmployeeDirectory", b =>
                    {
                        b.ForeignKey("Kendo.Mvc.Examples.Models.EmployeeDirectory", "EmployeeDirectoryId");
                    });
                
                builder.Entity("Kendo.Mvc.Examples.Models.GanttTask", b =>
                    {
                        b.ForeignKey("Kendo.Mvc.Examples.Models.GanttTask", "GanttTaskId");
                    });
                
                builder.Entity("Kendo.Mvc.Examples.Models.Meeting", b =>
                    {
                        b.ForeignKey("Kendo.Mvc.Examples.Models.Meeting", "MeetingID");
                    });
                
                builder.Entity("Kendo.Mvc.Examples.Models.MeetingAttendee", b =>
                    {
                        b.ForeignKey("Kendo.Mvc.Examples.Models.Meeting", "MeetingID");
                    });
                
                builder.Entity("Kendo.Mvc.Examples.Models.Order", b =>
                    {
                        b.ForeignKey("Kendo.Mvc.Examples.Models.Customer", "CustomerID");
                        b.ForeignKey("Kendo.Mvc.Examples.Models.Shipper", "ShipperId");
                    });
                
                builder.Entity("Kendo.Mvc.Examples.Models.Order_Detail", b =>
                    {
                        b.ForeignKey("Kendo.Mvc.Examples.Models.Order", "OrderID");
                        b.ForeignKey("Kendo.Mvc.Examples.Models.Product", "ProductID");
                    });
                
                builder.Entity("Kendo.Mvc.Examples.Models.Product", b =>
                    {
                        b.ForeignKey("Kendo.Mvc.Examples.Models.Supplier", "SupplierID");
                        b.ForeignKey("Kendo.Mvc.Examples.Models.Category", "CategoryID");
                    });
                
                builder.Entity("Kendo.Mvc.Examples.Models.Task", b =>
                    {
                        b.ForeignKey("Kendo.Mvc.Examples.Models.Task", "TaskID");
                    });
                
                builder.Entity("Kendo.Mvc.Examples.Models.Territory", b =>
                    {
                        b.ForeignKey("Kendo.Mvc.Examples.Models.Region", "RegionID");
                        b.ForeignKey("Kendo.Mvc.Examples.Models.Employee", "EmployeeId");
                    });
                
                return builder.Model;
            }
        }
    }
}