using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Http;
using Kendo.Mvc.Examples.Extensions;

namespace Kendo.Mvc.Examples.Models
{
	public class ProductService : BaseService, IProductService
    {
        private static bool UpdateDatabase = false;
        private ISession _session;

        public ISession Session { get { return _session; } }

        public ProductService(IHttpContextAccessor httpContextAccessor)
        {
            _session = httpContextAccessor.HttpContext.Session;
        }

        public IEnumerable<ProductViewModel> Read()
        {
            return GetAll();
        }

        public IList<ProductViewModel> GetAll()
        {
            using (var db = GetContext())
            {
                var result = Session.GetObjectFromJson<IList<ProductViewModel>>("Products");

                if (result == null || UpdateDatabase)
                {
                    var categories = db.Categories.ToList();

                    result = db.Products.ToList().Select(product =>
                    {
                        var category = categories.First(c => product.CategoryID == c.CategoryID);

                        return new ProductViewModel
                        {
                            ProductID = product.ProductID,
                            ProductName = product.ProductName,
                            UnitPrice = product.UnitPrice.HasValue ? product.UnitPrice.Value : default(decimal),
                            UnitsInStock = product.UnitsInStock.HasValue ? product.UnitsInStock.Value : default(int),
                            QuantityPerUnit = product.QuantityPerUnit,
                            Discontinued = product.Discontinued,
                            UnitsOnOrder = product.UnitsOnOrder.HasValue ? product.UnitsOnOrder.Value : default(int),
                            CategoryID = product.CategoryID,
                            Category = new CategoryViewModel()
                            {
                                CategoryID = category.CategoryID,
                                CategoryName = category.CategoryName
                            },
                            LastSupply = DateTime.Today
                        };
                    }).ToList();

                    Session.SetObjectAsJson("Products", result);
                }

                return result;
            } 
        }

        public void Create(ProductViewModel product)
        {
            if (!UpdateDatabase)
            {
                var products = GetAll();
                var first = products.OrderByDescending(e => e.ProductID).FirstOrDefault();
                var id = (first != null) ? first.ProductID : 0;

                product.ProductID = id + 1;

                products.Insert(0, product);

                Session.SetObjectAsJson("Products", products);
            }
            else
            {
                using (var db = GetContext())
                {
                    var entity = new Product();

                    entity.ProductName = product.ProductName;
                    entity.UnitPrice = product.UnitPrice;
                    entity.UnitsInStock = (short)product.UnitsInStock;
                    entity.Discontinued = product.Discontinued;
                    entity.CategoryID = product.CategoryID;

                    if (entity.CategoryID == null)
                    {
                        entity.CategoryID = 1;
                    }

                    if (product.Category != null)
                    {
                        entity.CategoryID = product.Category.CategoryID;
                    }

                    db.Products.Add(entity);
                    db.SaveChanges();

                    product.ProductID = (int)entity.ProductID;
                }
            }
        }

        public void Update(ProductViewModel product)
        {
            if (!UpdateDatabase)
            {
                var products = GetAll();
                var target = products.FirstOrDefault(e => e.ProductID == product.ProductID);

                if (target != null)
                {
                    target.ProductName = product.ProductName;
                    target.UnitPrice = product.UnitPrice;
                    target.UnitsInStock = product.UnitsInStock;
                    target.Discontinued = product.Discontinued;
                    target.CategoryID = product.CategoryID;
                    target.Category = product.Category;
                }

                Session.SetObjectAsJson("Products", products);
            }
            else
            {
                using (var db = GetContext())
                {
                    var entity = new Product();

                    entity.ProductID = product.ProductID;
                    entity.ProductName = product.ProductName;
                    entity.UnitPrice = product.UnitPrice;
                    entity.UnitsInStock = (short)product.UnitsInStock;
                    entity.Discontinued = product.Discontinued;
                    entity.CategoryID = product.CategoryID;

                    if (product.Category != null)
                    {
                        entity.CategoryID = product.Category.CategoryID;
                    }

                    db.Products.Attach(entity);
                    db.Entry(entity).State = EntityState.Modified;
                    db.SaveChanges();
                }
            }
        }

        public void Destroy(ProductViewModel product)
        {
            if (!UpdateDatabase)
            {
                var products = GetAll();
                var target = products.FirstOrDefault(e => e.ProductID == product.ProductID);

                if (target != null)
                {
                    products.Remove(target);
                }

                Session.SetObjectAsJson("Products", products);
            }
            else
            {
                using (var db = GetContext())
                {
                    var entity = new Product();

                    entity.ProductID = product.ProductID;

                    db.Products.Attach(entity);

                    db.Products.Remove(entity);

                    var orderDetails = db.OrderDetails.Where(pd => pd.ProductID == entity.ProductID);

                    foreach (var orderDetail in orderDetails)
                    {
                        db.OrderDetails.Remove(orderDetail);
                    }

                    db.SaveChanges();
                }
            }
        }
    }
}