using System;
using Microsoft.Data.Entity;
using Microsoft.Data.Entity.SqlServer.Extensions;

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
                entity.ToSqlServerTable("Categories");
                entity.Key(e => e.CategoryID);
                
                entity.Property(e => e.CategoryID)
                      .UseSqlServerIdentityColumn();
            });
            
            modelBuilder.Entity<CustomerCustomerDemo>(entity =>
            {
                entity.Key(e => new { e.CustomerID, e.CustomerTypeID });
            });
            
            modelBuilder.Entity<CustomerDemographic>(entity =>
            {
                entity.ToSqlServerTable("CustomerDemographics");
                entity.Key(e => e.CustomerTypeID);
            });
            
            modelBuilder.Entity<Customer>(entity =>
            {
                entity.ToSqlServerTable("Customers");
                entity.Key(e => e.CustomerID);
            });
            
            modelBuilder.Entity<EmployeeDirectory>(entity =>
            {
                entity.Key(e => e.EmployeeID);
                
                entity.Property(e => e.EmployeeID)
                    .UseSqlServerIdentityColumn();
            });
            
            modelBuilder.Entity<Employee>(entity =>
            {
                entity.ToSqlServerTable("Employees");

                entity.Key(e => e.EmployeeID);
                
                entity.Property(e => e.EmployeeID)
                    .UseSqlServerIdentityColumn();
            });
            
            modelBuilder.Entity<EmployeeTerritories>(entity =>
            {
                entity.Key(e => new { e.EmployeeID, e.TerritoryID });
            });
            
            modelBuilder.Entity<GanttDependency>(entity =>
            {
                entity.ToSqlServerTable("GanttDependencies");

                entity.Property(e => e.ID)
                    .UseSqlServerIdentityColumn();
            });
            
            modelBuilder.Entity<GanttResourceAssignment>(entity =>
            {
                entity.ToSqlServerTable("GanttResourceAssignments");

                entity.Property(e => e.ID)
                    .UseSqlServerIdentityColumn();
                
                entity.Property(e => e.Units)
                      .HasColumnType("decimal(5, 2)");
            });
            
            modelBuilder.Entity<GanttResource>(entity =>
            {
                entity.ToSqlServerTable("GanttResources");

                entity.Property(e => e.ID)
                    .UseSqlServerIdentityColumn();
            });
            
            modelBuilder.Entity<GanttTask>(entity =>
            {
                entity.ToSqlServerTable("GanttTasks");

                entity.Property(e => e.ID)
                    .UseSqlServerIdentityColumn();
                
                entity.Property(e => e.PercentComplete)
                    .HasColumnType("decimal(5, 2)");
            });
            
            modelBuilder.Entity<Intraday>(entity =>
            {
                entity.Property(e => e.ID)
                    .UseSqlServerIdentityColumn();
                
                entity.Property(e => e.Close)
                    .HasColumnType("decimal(9, 3)");
                
                entity.Property(e => e.High)
                    .HasColumnType("decimal(9, 3)");
                
                entity.Property(e => e.Low)
                    .HasColumnType("decimal(9, 3)");
                
                entity.Property(e => e.Open)
                    .HasColumnType("decimal(9, 3)");
            });
            
            modelBuilder.Entity<MeetingAttendee>(entity =>
            {
                entity.ToSqlServerTable("MeetingAttendees");
                entity.Key(e => new { e.MeetingID, e.AttendeeID });
            });
            
            modelBuilder.Entity<Meeting>(entity =>
            {
                entity.ToSqlServerTable("Meetings");

                entity.Key(e => e.MeetingID);
                
                entity.Property(e => e.MeetingID)
                    .UseSqlServerIdentityColumn();
            });
            
            modelBuilder.Entity<Order_Detail>(entity =>
            {
                entity.Key(e => new { e.OrderID, e.ProductID });
                
                entity.ToSqlServerTable("Order Details");
                
                entity.Property(e => e.Discount)
                    .DefaultValue(0D);
                
                entity.Property(e => e.Quantity)
                    .DefaultValue(1);
                
                entity.Property(e => e.UnitPrice)
                    .HasColumnType("decimal(5, 2)");
                
                entity.Property(e => e.UnitPrice)
                    .DefaultValue(0m);
            });
            
            modelBuilder.Entity<Order>(entity =>
            {
                entity.ToSqlServerTable("Orders");
                entity.Key(e => e.OrderID);
                
                entity.Property(e => e.OrderID)
                    .UseSqlServerIdentityColumn();
                
                entity.Property(e => e.Freight)
                    .HasColumnType("decimal(6, 2)");
                
                entity.Property(e => e.Freight)
                    .DefaultValue(0m);
            });
            
            modelBuilder.Entity<OrgChartConnection>(entity =>
            {
                entity.ToSqlServerTable("OrgChartConnections");

                entity.Property(e => e.Id)
                    .UseSqlServerIdentityColumn();
            });
            
            modelBuilder.Entity<OrgChartShape>(entity =>
            {
                entity.ToSqlServerTable("OrgChartShapes");

                entity.Property(e => e.Id)
                    .UseSqlServerIdentityColumn();
            });
            
            modelBuilder.Entity<Product>(entity =>
            {
                entity.ToSqlServerTable("Products");

                entity.Key(e => e.ProductID);
                
                entity.Property(e => e.ProductID)
                    .UseSqlServerIdentityColumn();
                
                entity.Property(e => e.Discontinued)
                    .DefaultValue(false);
                
                entity.Property(e => e.ReorderLevel)
                    .DefaultValue(0);
                
                entity.Property(e => e.UnitPrice)
                    .HasColumnType("decimal(5, 2)");
                
                entity.Property(e => e.UnitPrice)
                    .DefaultValue(0m);
                
                entity.Property(e => e.UnitsInStock)
                    .DefaultValue(0);
                
                entity.Property(e => e.UnitsOnOrder)
                    .DefaultValue(0);
            });
            
            modelBuilder.Entity<Region>(entity =>
            {
            });
            
            modelBuilder.Entity<Shipper>(entity =>
            {
                entity.ToSqlServerTable("Shippers");
                entity.Key(e => e.ShipperID);
                
                entity.Property(e => e.ShipperID)
                    .UseSqlServerIdentityColumn();
            });
            
            modelBuilder.Entity<Stock>(entity =>
            {
                entity.Property(e => e.ID)
                    .UseSqlServerIdentityColumn();
                
                entity.Property(e => e.Close)
                    .HasColumnType("decimal(9, 3)");
                
                entity.Property(e => e.High)
                    .HasColumnType("decimal(9, 3)");
                
                entity.Property(e => e.Low)
                    .HasColumnType("decimal(9, 3)");
                
                entity.Property(e => e.Open)
                    .HasColumnType("decimal(9, 3)");
            });
            
            modelBuilder.Entity<Supplier>(entity =>
            {
                entity.ToSqlServerTable("Suppliers");
                entity.Key(e => e.SupplierID);
                
                entity.Property(e => e.SupplierID)
                    .UseSqlServerIdentityColumn();
            });
            
            modelBuilder.Entity<Task>(entity =>
            {
                entity.ToSqlServerTable("Tasks");

                entity.Key(e => e.TaskID);
                
                entity.Property(e => e.TaskID)
                    .UseSqlServerIdentityColumn();
            });
            
            modelBuilder.Entity<Territory>(entity =>
            {
                entity.ToSqlServerTable("Territories");

                entity.Key(e => e.TerritoryID);
            });
            
            modelBuilder.Entity<UrbanArea>(entity =>
            {
                entity.ToSqlServerTable("UrbanAreas");

                entity.Property(e => e.ID)
                    .UseSqlServerIdentityColumn();
                
                entity.Property(e => e.Latitude)
                    .HasColumnType("decimal(9, 6)");
                
                entity.Property(e => e.Longitude)
                    .HasColumnType("decimal(9, 6)");
            });
            
            modelBuilder.Entity<Weather>(entity =>
            {
                entity.Property(e => e.ID)
                    .UseSqlServerIdentityColumn();
                
                entity.Property(e => e.Gust)
                    .HasColumnType("decimal(5, 2)");
                
                entity.Property(e => e.Rain)
                    .HasColumnType("decimal(5, 2)");
                
                entity.Property(e => e.Snow)
                    .HasColumnType("decimal(5, 2)");
                
                entity.Property(e => e.TMax)
                    .HasColumnType("decimal(5, 2)");
                
                entity.Property(e => e.TMin)
                    .HasColumnType("decimal(5, 2)");
                
                entity.Property(e => e.Wind)
                    .HasColumnType("decimal(5, 2)");
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
