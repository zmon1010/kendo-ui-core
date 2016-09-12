namespace Kendo.Mvc.UI
{
    public class ChartNavigatorSelectionMousewheel : ChartSelectionMousewheel
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ChartNavigatorSelectionMousewheel" /> class.
        /// </summary>
        public ChartNavigatorSelectionMousewheel() : base()
        {
            Enabled = true;
        }

        public bool Enabled { get; set; }
    }
}