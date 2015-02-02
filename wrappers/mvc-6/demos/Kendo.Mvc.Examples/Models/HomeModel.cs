using System;
using System.ComponentModel.DataAnnotations;

namespace Kendo.Mvc.Examples.Models
{
    public class HomeModel
    {
        [Range(typeof(DateTime), "1994/05/01", "2004/05/01")]
        public DateTime Date {
            get;
            set;
        }
    }
}