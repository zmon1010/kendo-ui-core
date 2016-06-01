using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace Kendo.Mvc.Examples.Models
{
	public class SpreadsheetProductService : IDisposable
    {
        private SampleEntitiesDataContext entities;

        public SpreadsheetProductService(SampleEntitiesDataContext entities)
        {
            this.entities = entities;
        }

        public IEnumerable<SpreadsheetProductViewModel> Read()
        {
            return entities.Products.Select(product => new SpreadsheetProductViewModel
            {
                ProductID = product.ProductID,
                ProductName = product.ProductName,
                UnitPrice = product.UnitPrice.HasValue ? product.UnitPrice.Value : default(decimal),
                UnitsInStock = product.UnitsInStock.HasValue ? product.UnitsInStock.Value : default(short),
                Discontinued = product.Discontinued
            });
        }

        public void Create(SpreadsheetProductViewModel product)
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

        public void Update(SpreadsheetProductViewModel product)
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

        public void Destroy(SpreadsheetProductViewModel product)
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

        public void Dispose()
        {
            entities.Dispose();
        }
    }
}