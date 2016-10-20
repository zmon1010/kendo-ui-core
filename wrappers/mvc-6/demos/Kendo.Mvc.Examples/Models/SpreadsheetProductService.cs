using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Http;
using Kendo.Mvc.Examples.Extensions;

namespace Kendo.Mvc.Examples.Models
{
	public class SpreadsheetProductService : BaseService, ISpreadsheetProductService
    {
        private static bool UpdateDatabase = false;
        private ISession _session;

        public ISession Session { get { return _session; } }

        public SpreadsheetProductService(IHttpContextAccessor httpContextAccessor)
        {
            _session = httpContextAccessor.HttpContext.Session;
        }

        public IEnumerable<SpreadsheetProductViewModel> Read()
        {
            return GetAll();
        }

        public IList<SpreadsheetProductViewModel> GetAll()
        {
            using (var db = GetContext())
            {
                var result = Session.GetObjectFromJson<IList<SpreadsheetProductViewModel>>("SpreadsheetProducts");

                if (result == null || UpdateDatabase)
                {
                    result = db.Products.Select(product => new SpreadsheetProductViewModel
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
                using (var db = GetContext())
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

                    db.Products.Add(entity);
                    db.SaveChanges();

                    product.ProductID = entity.ProductID;
                }
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
                using (var db = GetContext())
                {
                    var entity = new Product();

                    entity.ProductID = product.ProductID;
                    entity.ProductName = product.ProductName;
                    entity.UnitPrice = product.UnitPrice;
                    entity.UnitsInStock = (short)product.UnitsInStock;
                    entity.Discontinued = product.Discontinued;

                    db.Products.Attach(entity);
                    db.Entry(entity).State = EntityState.Modified;
                    db.SaveChanges();
                }
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