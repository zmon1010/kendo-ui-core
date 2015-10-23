using System;
using Microsoft.Data.Entity;
using System.IO;

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
            // Should be a better way to obtain the webroot path here
            var dataDirectory = Path.Combine(Startup.WebRootPath, "App_Data");
            optionsBuilder.UseSqlServer(@"Server=(localdb)\MSSQLLocalDB;AttachDbFilename=" + dataDirectory + @"\Sample.mdf;Integrated Security=True;");

            base.OnConfiguring(optionsBuilder);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Category>(entity =>
            {
                entity.ToSqlServerTable("Categories");
                entity.HasKey(e => e.CategoryID);
                
                entity.Property(e => e.CategoryID)
                      .UseSqlServerIdentityColumn();
            });
            
            modelBuilder.Entity<CustomerCustomerDemo>(entity =>
            {
                entity.HasKey(e => new { e.CustomerID, e.CustomerTypeID });
            });
            
            modelBuilder.Entity<CustomerDemographic>(entity =>
            {
                entity.ToSqlServerTable("CustomerDemographics");
                entity.HasKey(e => e.CustomerTypeID);
            });
            
            modelBuilder.Entity<Customer>(entity =>
            {
                entity.ToSqlServerTable("Customers");
                entity.HasKey(e => e.CustomerID);
            });
            
            modelBuilder.Entity<EmployeeDirectory>(entity =>
            {
                entity.HasKey(e => e.EmployeeID);
                
                entity.Property(e => e.EmployeeID)
                    .UseSqlServerIdentityColumn();
            });
            
            modelBuilder.Entity<Employee>(entity =>
            {
                entity.ToSqlServerTable("Employees");

                entity.HasKey(e => e.EmployeeID);
                
                entity.Property(e => e.EmployeeID)
                    .UseSqlServerIdentityColumn();
            });
            
            modelBuilder.Entity<EmployeeTerritories>(entity =>
            {
                entity.HasKey(e => new { e.EmployeeID, e.TerritoryID });
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
                entity.HasKey(e => new { e.MeetingID, e.AttendeeID });
            });
            
            modelBuilder.Entity<Meeting>(entity =>
            {
                entity.ToSqlServerTable("Meetings");

                entity.HasKey(e => e.MeetingID);
                
                entity.Property(e => e.MeetingID)
                    .UseSqlServerIdentityColumn();
            });
            
            modelBuilder.Entity<Order_Detail>(entity =>
            {
                entity.HasKey(e => new { e.OrderID, e.ProductID });
                
                entity.ToSqlServerTable("Order Details");
                
                entity.Property(e => e.Discount)
                    .Metadata.SqlServer().DefaultValue = 0D;
                
                entity.Property(e => e.Quantity)
                    .Metadata.SqlServer().DefaultValue = 1;
                
                entity.Property(e => e.UnitPrice)
                    .HasColumnType("decimal(5, 2)");
                
                entity.Property(e => e.UnitPrice)
                    .Metadata.SqlServer().DefaultValue = 0m;
            });
            
            modelBuilder.Entity<Order>(entity =>
            {
                entity.ToSqlServerTable("Orders");
                entity.HasKey(e => e.OrderID);
                
                entity.Property(e => e.OrderID)
                    .UseSqlServerIdentityColumn();
                
                entity.Property(e => e.Freight)
                    .HasColumnType("decimal(6, 2)");
                
                entity.Property(e => e.Freight)
                    .Metadata.SqlServer().DefaultValue = 0m;
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

                entity.HasKey(e => e.ProductID);
                
                entity.Property(e => e.ProductID)
                    .UseSqlServerIdentityColumn();
                
                entity.Property(e => e.Discontinued)
                    .Metadata.SqlServer().DefaultValue = false;
                
                entity.Property(e => e.ReorderLevel)
                    .Metadata.SqlServer().DefaultValue = 0;
                
                entity.Property(e => e.UnitPrice)
                    .HasColumnType("decimal(5, 2)");
                
                entity.Property(e => e.UnitPrice)
                    .Metadata.SqlServer().DefaultValue = 0m;
                
                entity.Property(e => e.UnitsInStock)
                    .Metadata.SqlServer().DefaultValue = 0;
                
                entity.Property(e => e.UnitsOnOrder)
                    .Metadata.SqlServer().DefaultValue = 0;
            });
            
            modelBuilder.Entity<Region>(entity =>
            {
            });
            
            modelBuilder.Entity<Shipper>(entity =>
            {
                entity.ToSqlServerTable("Shippers");
                entity.HasKey(e => e.ShipperID);
                
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
                entity.HasKey(e => e.SupplierID);
                
                entity.Property(e => e.SupplierID)
                    .UseSqlServerIdentityColumn();
            });
            
            modelBuilder.Entity<Task>(entity =>
            {
                entity.ToSqlServerTable("Tasks");

                entity.HasKey(e => e.TaskID);
                
                entity.Property(e => e.TaskID)
                    .UseSqlServerIdentityColumn();
            });
            
            modelBuilder.Entity<Territory>(entity =>
            {
                entity.ToSqlServerTable("Territories");

                entity.HasKey(e => e.TerritoryID);
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
                entity.HasOne(d => d.Customer).WithMany(p => p.CustomerCustomerDemo).ForeignKey(d => d.CustomerID);                
                entity.HasOne(d => d.CustomerType).WithMany(p => p.CustomerCustomerDemo).ForeignKey(d => d.CustomerTypeID);
            });
            
            modelBuilder.Entity<EmployeeDirectory>(entity =>
            {
                entity.HasOne(d => d.EmployeeDirectory2).WithOne().ForeignKey<EmployeeDirectory>(d => d.ReportsTo);
            });
            
            modelBuilder.Entity<Employee>(entity =>
            {
                entity.HasOne(d => d.ReportsToNavigation).WithOne().ForeignKey<Employee>(d => d.ReportsTo);
            });
            
            modelBuilder.Entity<EmployeeTerritories>(entity =>
            {
                entity.HasOne(d => d.Employee).WithMany(p => p.EmployeeTerritories).ForeignKey(d => d.EmployeeID);
                
                entity.HasOne(d => d.Territory).WithMany(p => p.EmployeeTerritories).ForeignKey(d => d.TerritoryID);
            });
            
            modelBuilder.Entity<GanttTask>(entity =>
            {
                entity.HasOne(d => d.Parent).WithOne().ForeignKey<GanttTask>(d => d.ParentID);
            });
            
            modelBuilder.Entity<MeetingAttendee>(entity =>
            {
                entity.HasOne(d => d.Meeting).WithMany(p => p.MeetingAttendees).ForeignKey(d => d.MeetingID);
            });
            
            modelBuilder.Entity<Meeting>(entity =>
            {
                entity.HasOne(d => d.Recurrence).WithOne().ForeignKey<Meeting>(d => d.RecurrenceID);
            });
            
            modelBuilder.Entity<Order_Detail>(entity =>
            {
                entity.HasOne(d => d.Order).WithMany(p => p.Order_Details).ForeignKey(d => d.OrderID);
                
                entity.HasOne(d => d.Product).WithMany(p => p.Order_Details).ForeignKey(d => d.ProductID);
            });
            
            modelBuilder.Entity<Order>(entity =>
            {
                entity.HasOne(d => d.Customer).WithMany(p => p.Orders).ForeignKey(d => d.CustomerID);
                
                entity.HasOne(d => d.Employee).WithMany(p => p.Orders).ForeignKey(d => d.EmployeeID);
                
                entity.HasOne(d => d.ShipViaNavigation).WithMany(p => p.Orders).ForeignKey(d => d.ShipVia);
            });
            
            modelBuilder.Entity<Product>(entity =>
            {
                entity.HasOne(d => d.Category).WithMany(p => p.Products).ForeignKey(d => d.CategoryID);
                
                entity.HasOne(d => d.Supplier).WithMany(p => p.Products).ForeignKey(d => d.SupplierID);
            });
            
            modelBuilder.Entity<Task>(entity =>
            {
                entity.HasOne(d => d.Recurrence).WithOne().ForeignKey<Task>(d => d.RecurrenceID);
            });
            
            modelBuilder.Entity<Territory>(entity =>
            {
                entity.HasOne(d => d.Region).WithMany(p => p.Territories).ForeignKey(d => d.RegionID);
            });
        }
    }
}
