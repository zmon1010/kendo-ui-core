using System;
using System.Collections.Generic;

namespace Kendo.Mvc.Examples.Models
{
    public partial class Stock
    {
        public long ID { get; set; }
        public double Close { get; set; }
        public string Date { get; set; }
        public double High { get; set; }
        public double Low { get; set; }
        public double Open { get; set; }
        public string Symbol { get; set; }
        public long Volume { get; set; }
    }
}
