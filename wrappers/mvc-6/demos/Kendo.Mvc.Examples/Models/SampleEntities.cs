using System;
using Microsoft.Data.Entity;
using Microsoft.Data.Entity.Metadata;

namespace Kendo.Mvc.Examples.Models
{
    public class SampleEntitiesDataContext : DbContext
    {
		protected override void OnConfiguring(DbContextOptions options)
		{
			options.UseSqlServer("Server=(localdb)\\MSSQLLocalDB;AttachDbFilename=|DataDirectory|\\Sample.mdf;Integrated Security=True;");
        }

		public virtual DbSet<Category> Categories { get; set; }
		public virtual DbSet<CustomerDemographic> CustomerDemographics { get; set; }
		public virtual DbSet<Customer> Customers { get; set; }
		public virtual DbSet<EmployeeDirectory> EmployeeDirectories { get; set; }
		public virtual DbSet<Employee> Employees { get; set; }
		public virtual DbSet<GanttDependency> GanttDependencies { get; set; }
		public virtual DbSet<GanttResourceAssignment> GanttResourceAssignments { get; set; }
		public virtual DbSet<GanttResource> GanttResources { get; set; }
		public virtual DbSet<GanttTask> GanttTasks { get; set; }
		public virtual DbSet<Intraday> Intradays { get; set; }
		public virtual DbSet<MeetingAttendee> MeetingAttendees { get; set; }
		public virtual DbSet<Meeting> Meetings { get; set; }
		public virtual DbSet<Order_Detail> Order_Details { get; set; }
		public virtual DbSet<Order> Orders { get; set; }
		public virtual DbSet<OrgChartConnection> OrgChartConnections { get; set; }
		public virtual DbSet<OrgChartShape> OrgChartShapes { get; set; }
		public virtual DbSet<Product> Products { get; set; }
		public virtual DbSet<Region> Regions { get; set; }
		public virtual DbSet<Shipper> Shippers { get; set; }
		public virtual DbSet<Stock> Stocks { get; set; }
		public virtual DbSet<Supplier> Suppliers { get; set; }
		public virtual DbSet<Task> Tasks { get; set; }
		public virtual DbSet<Territory> Territories { get; set; }
		public virtual DbSet<UrbanArea> UrbanAreas { get; set; }
		public virtual DbSet<Weather> Weathers { get; set; }

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			modelBuilder.Entity<CustomerDemographic>()				
				.Key(e => e.CustomerTypeID);			

			modelBuilder.Entity<Customer>()
				.Key(e => e.CustomerID);

			modelBuilder.Entity<MeetingAttendee>()
				.Key(e => e.AttendeeID);

			modelBuilder.Entity<EmployeeDirectory>()
				.Key(e => e.EmployeeID);

			modelBuilder.Entity<Order_Detail>()
				.Key(e => e.OrderID);

			modelBuilder.Entity<Order_Detail>()
				.Key(e => e.ProductID);

			modelBuilder.Entity<EmployeeDirectory>()
				.HasMany(e => e.EmployeeDirectory1);

			modelBuilder.Entity<Employee>()
				.HasMany(e => e.Employees1);

			modelBuilder.Entity<Employee>()
				.HasMany(e => e.Territories);			

			modelBuilder.Entity<GanttTask>()
				.HasMany(e => e.GanttTasks1);

			modelBuilder.Entity<Meeting>()
				.HasMany(e => e.MeetingAttendees);

			modelBuilder.Entity<Meeting>()
				.HasMany(e => e.Meetings1);

			modelBuilder.Entity<Order>()
				.HasMany(e => e.Order_Details);

			modelBuilder.Entity<Product>(builder =>
			{
				builder.HasMany(e => e.Order_Details)
					.WithOne(o => o.Product)
					.ForeignKey(o => o.ProductID);					
			});			

			modelBuilder.Entity<Region>()
				.HasMany(e => e.Territories);

			modelBuilder.Entity<Shipper>()
				.HasMany(e => e.Orders);			

			modelBuilder.Entity<Task>()
				.HasMany(e => e.Tasks1);
			
			modelBuilder.Entity<Category>()
				.ForSqlServer().Table("Categories");

			modelBuilder.Entity<Customer>()
				.ForSqlServer().Table("Customers");

			modelBuilder.Entity<CustomerDemographic>()
				.ForSqlServer().Table("CustomerDemographics");

			modelBuilder.Entity<Employee>()
				.ForSqlServer().Table("Employees");

			modelBuilder.Entity<EmployeeDirectory>()
				.ForSqlServer().Table("EmployeeDirectories");

			modelBuilder.Entity<GanttDependency>()
				.ForSqlServer().Table("GanttDependencies");

			modelBuilder.Entity<GanttResource>()
				.ForSqlServer().Table("GanttResources");

			modelBuilder.Entity<GanttResourceAssignment>()
				.ForSqlServer().Table("GanttResourceAssignment");

			modelBuilder.Entity<GanttTask>()
				.ForSqlServer().Table("GanttTasks");

			modelBuilder.Entity<Meeting>()
				.ForSqlServer().Table("Meetings");

			modelBuilder.Entity<MeetingAttendee>()
				.ForSqlServer().Table("MeetingAttendees");

			modelBuilder.Entity<Order>()
				.ForSqlServer().Table("Orders");

			modelBuilder.Entity<Order_Detail>()
				.ForSqlServer().Table("Order_Details");

			modelBuilder.Entity<OrgChartConnection>()
				.ForSqlServer().Table("OrgChartConnections");

			modelBuilder.Entity<OrgChartShape>()
				.ForSqlServer().Table("OrgChartShapes");

			modelBuilder.Entity<Product>()
				.ForSqlServer().Table("Products");

			modelBuilder.Entity<Region>()
				.ForSqlServer().Table("Regions");

			modelBuilder.Entity<Shipper>()
				.ForSqlServer().Table("Shippers");

			modelBuilder.Entity<Task>()
				.ForSqlServer().Table("Tasks");

			modelBuilder.Entity<Territory>()
				.ForSqlServer().Table("Territories");

			modelBuilder.Entity<UrbanArea>()
				.ForSqlServer().Table("UrbanAreas");
		}
	}
}