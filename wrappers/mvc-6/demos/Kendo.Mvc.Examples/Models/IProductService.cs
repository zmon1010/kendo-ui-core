using System.Collections.Generic;

namespace Kendo.Mvc.Examples.Models
{
    public interface IProductService
    {
        IEnumerable<ProductViewModel> Read();
        void Create(ProductViewModel product);
        void Update(ProductViewModel product);
        void Destroy(ProductViewModel product);
    }
}