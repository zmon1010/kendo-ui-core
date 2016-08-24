using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Http;
using Kendo.Mvc.Examples.Extensions;

namespace Kendo.Mvc.Examples.Models
{
	public class SpreadsheetProductService : ISpreadsheetProductService, IDisposable
    {
        private static bool UpdateDatabase = false;
        private SampleEntitiesDataContext entities;
        private ISession _session;

        public ISession Session { get { return _session; } }

        public SpreadsheetProductService(IHttpContextAccessor httpContextAccessor, SampleEntitiesDataContext context)
        {
            entities = context;
            _session = httpContextAccessor.HttpContext.Session;
        }

        public IEnumerable<SpreadsheetProductViewModel> Read()
        {
            return GetAll();
        }

        public IList<SpreadsheetProductViewModel> GetAll()
        {
            var result = Session.GetObjectFromJson<IList<SpreadsheetProductViewModel>>("SpreadsheetProducts");

            if (result == null || UpdateDatabase)
            {
                result = entities.Products.Select(product => new SpreadsheetProductViewModel
                {
                    ProductID = product.ProductID,
                    ProductName = product.ProductName,
                    UnitPrice = product.UnitPrice.HasValue ? product.UnitPrice.Value : default(decimal),
                    UnitsInStock = product.UnitsInStock.HasValue ? product.UnitsInStock.Value : default(short),
                    Discontinued = product.Discontinued
                }).ToList();

                Session.SetObjectAsJson("SpreadsheetProducts", result);
            }

            return result;
        }

        public void Create(SpreadsheetProductViewModel product)
        {
            if (!UpdateDatabase)
            {
                var products = GetAll();
                var first = products.OrderByDescending(e => e.ProductID).FirstOrDefault();
                var id = (first != null) ? first.ProductID : 0;

                product.ProductID = id + 1;

                products.Add(product);

                Session.SetObjectAsJson("SpreadsheetProducts", products);
            }
            else
            {
                var entity = new Product();

                entity.ProductName = product.ProductName;
                entity.UnitPrice = product.UnitPrice;
                entity.UnitsInStock = (short)product.UnitsInStock;
                entity.Discontinued = product.Discontinued;

                if (entity.CategoryID == null)
                {
                    entity.CategoryID = 1;
                }

                entities.Products.Add(entity);
                entities.SaveChanges();

                product.ProductID = entity.ProductID;
            }
        }

        public void Update(SpreadsheetProductViewModel product)
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
                }

                Session.SetObjectAsJson("SpreadsheetProducts", products);
            }
            else
            {
                var entity = new Product();

                entity.ProductID = product.ProductID;
                entity.ProductName = product.ProductName;
                entity.UnitPrice = product.UnitPrice;
                entity.UnitsInStock = (short)product.UnitsInStock;
                entity.Discontinued = product.Discontinued;

                entities.Products.Attach(entity);
                entities.Entry(entity).State = EntityState.Modified;
                entities.SaveChanges();
            }
        }

        public void Destroy(SpreadsheetProductViewModel product)
        {
            if (!UpdateDatabase)
            {
                var products = GetAll();
                var target = products.FirstOrDefault(e => e.ProductID == product.ProductID);

                if (target != null)
                {
                    products.Remove(target);
                }
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