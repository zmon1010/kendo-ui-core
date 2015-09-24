using System.Collections.Generic;
using System.Runtime.Serialization;

namespace Telerik.Web.Spreadsheet
{
    /// <summary>
    /// Represents a Workbook
    /// </summary>
    public partial class Workbook
    {
        public Worksheet AddSheet()
        {
            if (Sheets == null)
            {
                Sheets = new List<Worksheet>();
            }

            var sheet = new Worksheet();

            Sheets.Add(sheet);

            return sheet;
        }
    }
}

