using System.Collections.Generic;

namespace Kendo.Mvc.Examples.Models
{
    public interface ISpreadsheetProductService
    {
        IEnumerable<SpreadsheetProductViewModel> Read();
        void Create(SpreadsheetProductViewModel product);
        void Update(SpreadsheetProductViewModel product);
        void Destroy(SpreadsheetProductViewModel product);
    }
}