using Kendo.Mvc.UI;
using System;
using System.ComponentModel.DataAnnotations;

namespace Kendo.Mvc.UI.Tests
{
    public class GanttTask : IGanttTask
    {
        public int Id
        {
            get;
            set;
        }

        public int ParentId
        {
            get;
            set;
        }

        public string Title
        {
            get;
            set;
        }

        private DateTime start;
        [Display(Name = "End Time")]
        [DisplayFormat(DataFormatString = "{0:MM/dd/yyyy}")]
        public DateTime Start
        {
            get
            {
                return start;
            }
            set
            {
                start = value.ToUniversalTime();
            }
        }

        private DateTime end;
        public DateTime End
        {
            get
            {
                return end;
            }
            set
            {
                end = value.ToUniversalTime();
            }
        }

        public decimal PercentComplete
        {
            get;
            set;
        }

        public bool Summary
        {
            get;
            set;
        }

        public bool Expanded
        {
            get;
            set;
        }

        public int OrderId
        {
            get;
            set;
        }

        public string CustomProperty
        {
            get;
            set;
        }
    }
}
