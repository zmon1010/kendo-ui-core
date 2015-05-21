// 
// Generated code
// 

using System;
using System.Collections.Generic;
using Microsoft.Data.Entity;
using Microsoft.Data.Entity.Metadata;

namespace Kendo.Mvc.Examples.Models
{
    public partial class Weather
    {
        public Weather()
        {
        }
        
        // Properties
        public int ID { get; set; }
        public DateTime Date { get; set; }
        public string Events { get; set; }
        public decimal? Gust { get; set; }
        public decimal Rain { get; set; }
        public decimal? Snow { get; set; }
        public string Station { get; set; }
        public decimal TMax { get; set; }
        public decimal TMin { get; set; }
        public decimal Wind { get; set; }
        
        // Navigation Properties
    }
}
