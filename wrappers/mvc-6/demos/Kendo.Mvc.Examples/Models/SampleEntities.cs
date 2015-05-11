using System;
using Microsoft.Data.Entity;
using Microsoft.Data.Entity.Metadata;

namespace Kendo.Mvc.Examples.Models
{
    public partial class SampleEntitiesDataContext : DbContext
    {
        public virtual DbSet<Category> Categories { get; set; }
        public virtual DbSet<CustomerCustomerDemo> CustomerCustomerDemo { get; set; }
        public virtual DbSet<CustomerDemographic> CustomerDemographics { get; set; }
        public virtual DbSet<Customer> Customers { get; set; }
        public virtual DbSet<EmployeeDirectory> EmployeeDirectories { get; set; }
        public virtual DbSet<Employee> Employees { get; set; }
        public virtual DbSet<EmployeeTerritories> EmployeeTerritories { get; set; }
        public virtual DbSet<GanttDependency> GanttDependencies { get; set; }
        public virtual DbSet<GanttResourceAssignment> GanttResourceAssignments { get; set; }
        public virtual DbSet<GanttResource> GanttResources { get; set; }
        public virtual DbSet<GanttTask> GanttTasks { get; set; }
        public virtual DbSet<Intraday> Intraday { get; set; }
        public virtual DbSet<MeetingAttendee> MeetingAttendees { get; set; }
        public virtual DbSet<Meeting> Meetings { get; set; }
        public virtual DbSet<Order_Detail> Order_Details { get; set; }
        public virtual DbSet<Order> Orders { get; set; }
        public virtual DbSet<OrgChartConnection> OrgChartConnections { get; set; }
        public virtual DbSet<OrgChartShape> OrgChartShapes { get; set; }
        public virtual DbSet<Product> Products { get; set; }
        public virtual DbSet<Region> Region { get; set; }
        public virtual DbSet<Shipper> Shippers { get; set; }
        public virtual DbSet<Stock> Stock { get; set; }
        public virtual DbSet<Supplier> Suppliers { get; set; }
        public virtual DbSet<Task> Tasks { get; set; }
        public virtual DbSet<Territory> Territories { get; set; }
        public virtual DbSet<UrbanArea> UrbanAreas { get; set; }
        public virtual DbSet<Weather> Weather { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(@"Server=(localdb)\MSSQLLocalDB;AttachDbFilename=|DataDirectory|\Sample.mdf;Integrated Security=True;");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Category>(entity =>
            {
                entity.ForSqlServer().Table("Categories");
                entity.Key(e => e.CategoryID);
                
                entity.Property(e => e.CategoryID)
                    .ForSqlServer().UseIdentity();
            });
            
            modelBuilder.Entity<CustomerCustomerDemo>(entity =>
            {
                entity.Key(e => new { e.CustomerID, e.CustomerTypeID });
            });
            
            modelBuilder.Entity<CustomerDemographic>(entity =>
            {
                entity.ForSqlServer().Table("CustomerDemographics");
                entity.Key(e => e.CustomerTypeID);
            });
            
            modelBuilder.Entity<Customer>(entity =>
            {
                entity.ForSqlServer().Table("Customers");
                entity.Key(e => e.CustomerID);
            });
            
            modelBuilder.Entity<EmployeeDirectory>(entity =>
            {
                entity.Key(e => e.EmployeeID);
                
                entity.Property(e => e.EmployeeID)
                    .ForSqlServer().UseIdentity();
            });
            
            modelBuilder.Entity<Employee>(entity =>
            {
                entity.ForSqlServer().Table("Employees");

                entity.Key(e => e.EmployeeID);
                
                entity.Property(e => e.EmployeeID)
                    .ForSqlServer().UseIdentity();
            });
            
            modelBuilder.Entity<EmployeeTerritories>(entity =>
            {
                entity.Key(e => new { e.EmployeeID, e.TerritoryID });
            });
            
            modelBuilder.Entity<GanttDependency>(entity =>
            {
                entity.ForSqlServer().Table("GanttDependencies");

                entity.Property(e => e.ID)
                    .ForSqlServer().UseIdentity();
            });
            
            modelBuilder.Entity<GanttResourceAssignment>(entity =>
            {
                entity.ForSqlServer().Table("GanttResourceAssignments");

                entity.Property(e => e.ID)
                    .ForSqlServer().UseIdentity();
                
                entity.Property(e => e.Units)
                    .ForRelational().ColumnType("decimal(5, 2)");
            });
            
            modelBuilder.Entity<GanttResource>(entity =>
            {
                entity.ForSqlServer().Table("GanttResources");

                entity.Property(e => e.ID)
                    .ForSqlServer().UseIdentity();
            });
            
            modelBuilder.Entity<GanttTask>(entity =>
            {
                entity.ForSqlServer().Table("GanttTasks");

                entity.Property(e => e.ID)
                    .ForSqlServer().UseIdentity();
                
                entity.Property(e => e.PercentComplete)
                    .ForRelational().ColumnType("decimal(5, 2)");
            });
            
            modelBuilder.Entity<Intraday>(entity =>
            {
                entity.Property(e => e.ID)
                    .ForSqlServer().UseIdentity();
                
                entity.Property(e => e.Close)
                    .ForRelational().ColumnType("decimal(9, 3)");
                
                entity.Property(e => e.High)
                    .ForRelational().ColumnType("decimal(9, 3)");
                
                entity.Property(e => e.Low)
                    .ForRelational().ColumnType("decimal(9, 3)");
                
                entity.Property(e => e.Open)
                    .ForRelational().ColumnType("decimal(9, 3)");
            });
            
            modelBuilder.Entity<MeetingAttendee>(entity =>
            {
                entity.ForSqlServer().Table("MeetingAttendees");
                entity.Key(e => new { e.MeetingID, e.AttendeeID });
            });
            
            modelBuilder.Entity<Meeting>(entity =>
            {
                entity.ForSqlServer().Table("Meetings");

                entity.Key(e => e.MeetingID);
                
                entity.Property(e => e.MeetingID)
                    .ForSqlServer().UseIdentity();
            });
            
            modelBuilder.Entity<Order_Detail>(entity =>
            {
                entity.Key(e => new { e.OrderID, e.ProductID });
                
                entity.ForRelational().Table("Order Details");
                
                entity.Property(e => e.Discount)
                    .ForRelational().DefaultValue(0D);
                
                entity.Property(e => e.Quantity)
                    .ForRelational().DefaultValue(1);
                
                entity.Property(e => e.UnitPrice)
                    .ForRelational().ColumnType("decimal(5, 2)");
                
                entity.Property(e => e.UnitPrice)
                    .ForRelational().DefaultValue(0m);
            });
            
            modelBuilder.Entity<Order>(entity =>
            {
                entity.ForSqlServer().Table("Orders");
                entity.Key(e => e.OrderID);
                
                entity.Property(e => e.OrderID)
                    .ForSqlServer().UseIdentity();
                
                entity.Property(e => e.Freight)
                    .ForRelational().ColumnType("decimal(6, 2)");
                
                entity.Property(e => e.Freight)
                    .ForRelational().DefaultValue(0m);
            });
            
            modelBuilder.Entity<OrgChartConnection>(entity =>
            {
                entity.ForSqlServer().Table("OrgChartConnections");

                entity.Property(e => e.Id)
                    .ForSqlServer().UseIdentity();
            });
            
            modelBuilder.Entity<OrgChartShape>(entity =>
            {
                entity.ForSqlServer().Table("OrgChartShapes");

                entity.Property(e => e.Id)
                    .ForSqlServer().UseIdentity();
            });
            
            modelBuilder.Entity<Product>(entity =>
            {
                entity.ForSqlServer().Table("Products");

                entity.Key(e => e.ProductID);
                
                entity.Property(e => e.ProductID)
                    .ForSqlServer().UseIdentity();
                
                entity.Property(e => e.Discontinued)
                    .ForRelational().DefaultValue(false);
                
                entity.Property(e => e.ReorderLevel)
                    .ForRelational().DefaultValue(0);
                
                entity.Property(e => e.UnitPrice)
                    .ForRelational().ColumnType("decimal(5, 2)");
                
                entity.Property(e => e.UnitPrice)
                    .ForRelational().DefaultValue(0m);
                
                entity.Property(e => e.UnitsInStock)
                    .ForRelational().DefaultValue(0);
                
                entity.Property(e => e.UnitsOnOrder)
                    .ForRelational().DefaultValue(0);
            });
            
            modelBuilder.Entity<Region>(entity =>
            {
            });
            
            modelBuilder.Entity<Shipper>(entity =>
            {
                entity.ForSqlServer().Table("Shippers");
                entity.Key(e => e.ShipperID);
                
                entity.Property(e => e.ShipperID)
                    .ForSqlServer().UseIdentity();
            });
            
            modelBuilder.Entity<Stock>(entity =>
            {
                entity.Property(e => e.ID)
                    .ForSqlServer().UseIdentity();
                
                entity.Property(e => e.Close)
                    .ForRelational().ColumnType("decimal(9, 3)");
                
                entity.Property(e => e.High)
                    .ForRelational().ColumnType("decimal(9, 3)");
                
                entity.Property(e => e.Low)
                    .ForRelational().ColumnType("decimal(9, 3)");
                
                entity.Property(e => e.Open)
                    .ForRelational().ColumnType("decimal(9, 3)");
            });
            
            modelBuilder.Entity<Supplier>(entity =>
            {
                entity.ForSqlServer().Table("Suppliers");
                entity.Key(e => e.SupplierID);
                
                entity.Property(e => e.SupplierID)
                    .ForSqlServer().UseIdentity();
            });
            
            modelBuilder.Entity<Task>(entity =>
            {
                entity.ForSqlServer().Table("Tasks");

                entity.Key(e => e.TaskID);
                
                entity.Property(e => e.TaskID)
                    .ForSqlServer().UseIdentity();
            });
            
            modelBuilder.Entity<Territory>(entity =>
            {
                entity.ForSqlServer().Table("Territories");

                entity.Key(e => e.TerritoryID);
            });
            
            modelBuilder.Entity<UrbanArea>(entity =>
            {
                entity.ForSqlServer().Table("UrbanAreas");

                entity.Property(e => e.ID)
                    .ForSqlServer().UseIdentity();
                
                entity.Property(e => e.Latitude)
                    .ForRelational().ColumnType("decimal(9, 6)");
                
                entity.Property(e => e.Longitude)
                    .ForRelational().ColumnType("decimal(9, 6)");
            });
            
            modelBuilder.Entity<Weather>(entity =>
            {
                entity.Property(e => e.ID)
                    .ForSqlServer().UseIdentity();
                
                entity.Property(e => e.Gust)
                    .ForRelational().ColumnType("decimal(5, 2)");
                
                entity.Property(e => e.Rain)
                    .ForRelational().ColumnType("decimal(5, 2)");
                
                entity.Property(e => e.Snow)
                    .ForRelational().ColumnType("decimal(5, 2)");
                
                entity.Property(e => e.TMax)
                    .ForRelational().ColumnType("decimal(5, 2)");
                
                entity.Property(e => e.TMin)
                    .ForRelational().ColumnType("decimal(5, 2)");
                
                entity.Property(e => e.Wind)
                    .ForRelational().ColumnType("decimal(5, 2)");
            });
            
            modelBuilder.Entity<CustomerCustomerDemo>(entity =>
            {
                entity.Reference<Customer>(d => d.Customer).InverseCollection(p => p.CustomerCustomerDemo).ForeignKey(d => d.CustomerID);
                
                entity.Reference<CustomerDemographic>(d => d.CustomerType).InverseCollection(p => p.CustomerCustomerDemo).ForeignKey(d => d.CustomerTypeID);
            });
            
            modelBuilder.Entity<EmployeeDirectory>(entity =>
            {
                entity.Reference<EmployeeDirectory>(d => d.EmployeeDirectory2).InverseReference().ForeignKey<EmployeeDirectory>(d => d.ReportsTo);
            });
            
            modelBuilder.Entity<Employee>(entity =>
            {
                entity.Reference<Employee>(d => d.ReportsToNavigation).InverseReference().ForeignKey<Employee>(d => d.ReportsTo);
            });
            
            modelBuilder.Entity<EmployeeTerritories>(entity =>
            {
                entity.Reference<Employee>(d => d.Employee).InverseCollection(p => p.EmployeeTerritories).ForeignKey(d => d.EmployeeID);
                
                entity.Reference<Territory>(d => d.Territory).InverseCollection(p => p.EmployeeTerritories).ForeignKey(d => d.TerritoryID);
            });
            
            modelBuilder.Entity<GanttTask>(entity =>
            {
                entity.Reference<GanttTask>(d => d.Parent).InverseReference().ForeignKey<GanttTask>(d => d.ParentID);
            });
            
            modelBuilder.Entity<MeetingAttendee>(entity =>
            {
                entity.Reference<Meeting>(d => d.Meeting).InverseCollection(p => p.MeetingAttendees).ForeignKey(d => d.MeetingID);
            });
            
            modelBuilder.Entity<Meeting>(entity =>
            {
                entity.Reference<Meeting>(d => d.Recurrence).InverseReference().ForeignKey<Meeting>(d => d.RecurrenceID);
            });
            
            modelBuilder.Entity<Order_Detail>(entity =>
            {
                entity.Reference<Order>(d => d.Order).InverseCollection(p => p.Order_Details).ForeignKey(d => d.OrderID);
                
                entity.Reference<Product>(d => d.Product).InverseCollection(p => p.Order_Details).ForeignKey(d => d.ProductID);
            });
            
            modelBuilder.Entity<Order>(entity =>
            {
                entity.Reference<Customer>(d => d.Customer).InverseCollection(p => p.Orders).ForeignKey(d => d.CustomerID);
                
                entity.Reference<Employee>(d => d.Employee).InverseCollection(p => p.Orders).ForeignKey(d => d.EmployeeID);
                
                entity.Reference<Shipper>(d => d.ShipViaNavigation).InverseCollection(p => p.Orders).ForeignKey(d => d.ShipVia);
            });
            
            modelBuilder.Entity<Product>(entity =>
            {
                entity.Reference<Category>(d => d.Category).InverseCollection(p => p.Products).ForeignKey(d => d.CategoryID);
                
                entity.Reference<Supplier>(d => d.Supplier).InverseCollection(p => p.Products).ForeignKey(d => d.SupplierID);
            });
            
            modelBuilder.Entity<Task>(entity =>
            {
                entity.Reference<Task>(d => d.Recurrence).InverseReference().ForeignKey<Task>(d => d.RecurrenceID);
            });
            
            modelBuilder.Entity<Territory>(entity =>
            {
                entity.Reference<Region>(d => d.Region).InverseCollection(p => p.Territories).ForeignKey(d => d.RegionID);
            });
        }
    }
}
