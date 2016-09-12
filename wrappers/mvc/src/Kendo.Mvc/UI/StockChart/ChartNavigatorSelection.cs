using System;

namespace Kendo.Mvc.UI
{
    public class ChartNavigatorSelection
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ChartDateSelection" /> class.
        /// </summary>
        public ChartNavigatorSelection()
        {
             Mousewheel = new ChartNavigatorSelectionMousewheel();
        }

        /// <summary>
        /// The lower boundary of the range.
        /// </summary>
        public DateTime? From
        {
            get;
            set;
        }

        /// <summary>
        /// The upper boundary of the range.
        /// </summary>
        public DateTime? To
        {
            get;
            set;
        }

        /// <summary>
        /// Mousewheel selection settings
        /// </summary>
        public ChartNavigatorSelectionMousewheel Mousewheel
        {
            get;
            set;
        }

        public IChartSerializer CreateSerializer()
        {
            return new ChartNavigatorSelectionSerializer(this);
        }
    }
}