// 
// Generated code
// 

using System;
using System.Collections.Generic;
using Microsoft.Data.Entity;
using Microsoft.Data.Entity.Metadata;

namespace Kendo.Mvc.Examples.Models
{
    public partial class Stock
    {
        public Stock()
        {
        }
        
        // Properties
        public int ID { get; set; }
        public decimal Close { get; set; }
        public DateTime Date { get; set; }
        public decimal High { get; set; }
        public decimal Low { get; set; }
        public decimal Open { get; set; }
        public string Symbol { get; set; }
        public long Volume { get; set; }
        
        // Navigation Properties
    }
}
