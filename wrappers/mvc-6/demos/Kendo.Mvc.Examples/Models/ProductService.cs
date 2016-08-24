using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Http;
using Kendo.Mvc.Examples.Extensions;

namespace Kendo.Mvc.Examples.Models
{
	public class ProductService : IProductService, IDisposable
    {
        private static bool UpdateDatabase = false;
        private SampleEntitiesDataContext entities;
        private ISession _session;

        public ISession Session { get { return _session; } }

        public ProductService(IHttpContextAccessor httpContextAccessor, SampleEntitiesDataContext context)
        {
            entities = context;
            _session = httpContextAccessor.HttpContext.Session;
        }

        public IEnumerable<ProductViewModel> Read()
        {
            return GetAll();
        }

        public IList<ProductViewModel> GetAll()
        {
            var result = Session.GetObjectFromJson<IList<ProductViewModel>>("Products");

            if (result == null || UpdateDatabase)
            {
                var categories = entities.Categories.ToList();

                result = entities.Products.ToList().Select(product => {
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

                entities.Products.Add(entity);
                entities.SaveChanges();

                product.ProductID = (int)entity.ProductID;
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

                entities.Products.Attach(entity);
                entities.Entry(entity).State = EntityState.Modified;
                entities.SaveChanges();
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
                var entity = new Product();

                entity.ProductID = product.ProductID;

                entities.Products.Attach(entity);

                entities.Products.Remove(entity);

                var orderDetails = entities.OrderDetails.Where(pd => pd.ProductID == entity.ProductID);

                foreach (var orderDetail in orderDetails)
                {
                    entities.OrderDetails.Remove(orderDetail);
                }

                entities.SaveChanges();
            }
        }

        public void Dispose()
        {
            entities.Dispose();
        }
    }
}