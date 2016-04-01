using System;

namespace Kendo.Mvc.Examples.Models
{
    public class BubbleChartsGroupedDataViewModel : Medals
    {
        public BubbleChartsGroupedDataViewModel()
        {
        }

        public BubbleChartsGroupedDataViewModel(Medals medals)
            : base(medals.Year, medals.Standing, medals.Number, medals.Country)
        {
        }

        public string Color { get; set; }
    }
}