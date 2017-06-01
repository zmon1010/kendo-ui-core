using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EnvDTE;
using EnvDTE80;
using Microsoft.AspNet.Scaffolding;
using Microsoft.AspNet.Scaffolding.EntityFramework;
using Microsoft.AspNet.Scaffolding.Core.Metadata;
using KendoScaffolder.UI.Models.Charts;
using System.Collections;
using System.Linq.Expressions;

namespace KendoScaffolder.UI.Models
{
    public enum ChartLegendPosition
    {
        Top,
        Bottom,
        Left,
        Right
    }

    public class ChartConfigurationViewModel : DataSourceBoundWidgetViewModel
    {
        public ModelMetadata EfMetadata { get; set; }

        public string Title { get; set; }
        public bool TooltipVisible { get; set; }
        public bool LegendVisible { get; set; }
        public ChartLegendPosition LegendPosition { get; set; }
        public string DataBindingType { get; set; }

        public List<AreaLikeChartConfiguration> AreaLikeSeries { get; set; }
        public List<BoxPlotChartConfiguration> BoxPlotSeries { get; set; }
        public List<BubbleChartConfiguration> BubbleSeries { get; set; }
        public List<BulletLikeChartConfiguration> BulletLikeSeries { get; set; }
        public List<CandlestickLikeChartConfiguration> CandlestickLikeSeries { get; set; }
        public List<PieLikeChartConfiguration> PieLikeSeries { get; set; }
        public List<RangeChartConfiguration> RangeSeries { get; set; }
        public List<ScatterLikeChartConfiguration> ScatterLikeSeries { get; set; }
        public List<WatterfallLikeChartConfiguration> WatterfallLikeSeries { get; set; }

        public readonly Dictionary<ChartSeriesType, Func<IList>> SeriesContainerMap;
        public readonly Dictionary<ChartSeriesType, string> SeriesContainerNameMap;
        public readonly Dictionary<ChartSeriesType, Func<IChartConfiguration>> SeriesConfigurationMap;
        public readonly Dictionary<ChartSeriesType, bool> HasCategoryAxis;

        public ChartConfigurationViewModel(CodeGenerationContext context)
            : base(context)
        {
            Title = String.Empty;
            DataBindingType = "Remote";
            LegendPosition = ChartLegendPosition.Right;

            AreaLikeSeries = new List<AreaLikeChartConfiguration>();
            BoxPlotSeries = new List<BoxPlotChartConfiguration>();
            BubbleSeries = new List<BubbleChartConfiguration>();
            BulletLikeSeries = new List<BulletLikeChartConfiguration>();
            CandlestickLikeSeries = new List<CandlestickLikeChartConfiguration>();
            PieLikeSeries = new List<PieLikeChartConfiguration>();
            RangeSeries = new List<RangeChartConfiguration>();
            ScatterLikeSeries = new List<ScatterLikeChartConfiguration>();
            WatterfallLikeSeries = new List<WatterfallLikeChartConfiguration>();

            SeriesContainerMap = PopulateSeriesContainerMap();
            SeriesContainerNameMap = PopulateSeriesContainerNameMap();
            SeriesConfigurationMap = PopulateSeriesConfigurationMap();

            HasCategoryAxis = PrepareChartCategoryAxisConfigurationOptions();
        }

        public ChartSeriesType SelectedSeriesType { get; set; }
        public IEnumerable<PropertyMetadata> SelectedModelFields { get; private set; }
        public PropertyMetadata CategoryAxis { get; set; }

        public override ModelType SelectedModelType
        {
            get { return base.SelectedModelType; }
            set { base.SelectedModelType = value; }
        }

        public override ModelType SelectedDbContextType
        {
            get { return base.SelectedDbContextType; }
            set { base.SelectedDbContextType = value; }
        }

        private Dictionary<ChartSeriesType, Func<IList>> PopulateSeriesContainerMap()
        {
            return new Dictionary<ChartSeriesType, Func<IList>>()
            {
                {ChartSeriesType.Area, () => this.AreaLikeSeries },
                {ChartSeriesType.Bar, () => this.AreaLikeSeries },
                {ChartSeriesType.Column, () => this.AreaLikeSeries },
                {ChartSeriesType.Line, () => this.AreaLikeSeries },
                {ChartSeriesType.VerticalArea, () => this.AreaLikeSeries },
                {ChartSeriesType.VerticalLine, () => this.AreaLikeSeries },
                {ChartSeriesType.RadarArea, () => this.AreaLikeSeries },
                {ChartSeriesType.RadarColumn, () => this.AreaLikeSeries },
                {ChartSeriesType.RadarLine, () => this.AreaLikeSeries },
                {ChartSeriesType.BoxPlot, () => this.BoxPlotSeries },
                {ChartSeriesType.Bubble, () => this.BubbleSeries },
                {ChartSeriesType.Bullet, () => this.BulletLikeSeries },
                {ChartSeriesType.VerticalBullet, () => this.BulletLikeSeries },
                {ChartSeriesType.CandleStick, () => this.CandlestickLikeSeries },
                {ChartSeriesType.OHLC, () => this.CandlestickLikeSeries },
                {ChartSeriesType.Funnel, () => this.AreaLikeSeries },
                {ChartSeriesType.RangeColumn, () => this.RangeSeries },
                {ChartSeriesType.RangeBar, () => this.RangeSeries },
                {ChartSeriesType.Pie, () => this.AreaLikeSeries },
                {ChartSeriesType.Donut, () => this.AreaLikeSeries },
                {ChartSeriesType.Scatter, () => this.ScatterLikeSeries },
                {ChartSeriesType.ScatterLine, () => this.ScatterLikeSeries },
                {ChartSeriesType.PolarArea, () => this.ScatterLikeSeries },
                {ChartSeriesType.PolarLine, () => this.ScatterLikeSeries },
                {ChartSeriesType.PolarScatter, () => this.ScatterLikeSeries },
                {ChartSeriesType.Waterfall, () => this.AreaLikeSeries },
                {ChartSeriesType.HorizontalWaterfall, () => this.AreaLikeSeries }
            };
        }

        private Dictionary<ChartSeriesType, string> PopulateSeriesContainerNameMap()
        {
            return new Dictionary<ChartSeriesType, string>()
            {
                {ChartSeriesType.Area, "AreaLikeSeries" },
                {ChartSeriesType.Bar, "AreaLikeSeries" },
                {ChartSeriesType.Column, "AreaLikeSeries" },
                {ChartSeriesType.Line, "AreaLikeSeries" },
                {ChartSeriesType.VerticalArea, "AreaLikeSeries" },
                {ChartSeriesType.VerticalLine, "AreaLikeSeries" },
                {ChartSeriesType.RadarArea, "AreaLikeSeries" },
                {ChartSeriesType.RadarColumn, "AreaLikeSeries" },
                {ChartSeriesType.RadarLine, "AreaLikeSeries" },
                {ChartSeriesType.BoxPlot, "BoxPlotSeries" },
                {ChartSeriesType.Bubble, "BubbleSeries" },
                {ChartSeriesType.Bullet, "BulletLikeSeries" },
                {ChartSeriesType.VerticalBullet, "BulletLikeSeries" },
                {ChartSeriesType.CandleStick, "CandlestickLikeSeries" },
                {ChartSeriesType.OHLC, "CandlestickLikeSeries" },
                {ChartSeriesType.Funnel, "AreaLikeSeries" },
                {ChartSeriesType.RangeColumn, "RangeSeries" },
                {ChartSeriesType.RangeBar, "RangeSeries" },
                {ChartSeriesType.Pie, "AreaLikeSeries" },
                {ChartSeriesType.Donut, "AreaLikeSeries" },
                {ChartSeriesType.Scatter, "ScatterLikeSeries" },
                {ChartSeriesType.ScatterLine, "ScatterLikeSeries" },
                {ChartSeriesType.PolarArea, "ScatterLikeSeries" },
                {ChartSeriesType.PolarLine, "ScatterLikeSeries" },
                {ChartSeriesType.PolarScatter, "ScatterLikeSeries" },
                {ChartSeriesType.Waterfall, "AreaLikeSeries" },
                {ChartSeriesType.HorizontalWaterfall, "AreaLikeSeries" }
            };
        }

        private Dictionary<ChartSeriesType, Func<IChartConfiguration>> PopulateSeriesConfigurationMap()
        {
            return new Dictionary<ChartSeriesType,Func<IChartConfiguration>>()
            {
                 {ChartSeriesType.Area, () => new AreaLikeChartConfiguration() },
                 {ChartSeriesType.Bar, () => new AreaLikeChartConfiguration() },
                 {ChartSeriesType.Column, () => new AreaLikeChartConfiguration() },
                 {ChartSeriesType.Line, () => new AreaLikeChartConfiguration() },
                 {ChartSeriesType.VerticalArea, () => new AreaLikeChartConfiguration() },
                 {ChartSeriesType.VerticalLine, () => new AreaLikeChartConfiguration() },
                 {ChartSeriesType.RadarArea, () => new AreaLikeChartConfiguration() },
                 {ChartSeriesType.RadarColumn, () => new AreaLikeChartConfiguration() },
                 {ChartSeriesType.RadarLine, () => new AreaLikeChartConfiguration() },
                 {ChartSeriesType.BoxPlot, () => new BoxPlotChartConfiguration() },
                 {ChartSeriesType.Bubble, () => new BubbleChartConfiguration() },
                 {ChartSeriesType.Bullet, () => new BulletLikeChartConfiguration() },
                 {ChartSeriesType.VerticalBullet, () => new BulletLikeChartConfiguration() },
                 {ChartSeriesType.CandleStick, () => new CandlestickLikeChartConfiguration() },
                 {ChartSeriesType.OHLC, () => new CandlestickLikeChartConfiguration() },
                 {ChartSeriesType.Funnel, () => new AreaLikeChartConfiguration() },
                 {ChartSeriesType.RangeColumn, () => new RangeChartConfiguration() },
                 {ChartSeriesType.RangeBar, () => new RangeChartConfiguration() },
                 {ChartSeriesType.Pie, () => new AreaLikeChartConfiguration() },
                 {ChartSeriesType.Donut, () => new AreaLikeChartConfiguration() },
                 {ChartSeriesType.Scatter, () => new ScatterLikeChartConfiguration() },
                 {ChartSeriesType.ScatterLine, () => new ScatterLikeChartConfiguration() },
                 {ChartSeriesType.PolarArea, () => new ScatterLikeChartConfiguration() },
                 {ChartSeriesType.PolarLine, () => new ScatterLikeChartConfiguration() },
                 {ChartSeriesType.PolarScatter, () => new ScatterLikeChartConfiguration() },
                 {ChartSeriesType.Waterfall, () => new AreaLikeChartConfiguration() },
                 {ChartSeriesType.HorizontalWaterfall, () => new AreaLikeChartConfiguration() }
            };
        }

        public void PopulateSelectedModelFields()
        {
            if (SelectedModelType != null && SelectedDbContextType != null)
            {
                try
                {
                    IEntityFrameworkService efService = (IEntityFrameworkService)Context.ServiceProvider.GetService(typeof(IEntityFrameworkService));
		            EfMetadata = efService.AddRequiredEntity(Context, SelectedDbContextType.TypeName, SelectedModelType.CodeType.FullName);

                    if (UseViewModel)
                    {
                        List<PropertyMetadata> fields = new List<PropertyMetadata>();
                        foreach (CodeElement field in SelectedViewModelType.CodeType.Children)
	                    {
                            PropertyMetadata next = new PropertyMetadata();
                            next.PropertyName = field.Name;
                            fields.Add(next);
	                    }
                        SelectedModelFields = fields;
                    }
                    else
                    {
                        SelectedModelFields = EfMetadata.Properties;
                    }
                }
                catch (Exception)
                {
                    EfMetadata = null;
                    //throw new InvalidOperationException("Invalid model configuration", ex);
                }
            }
        }

        public IEnumerable<string> DataBindingTypes
        {
            get
            {
                return new List<string> { "Remote", "Local" };
            }
        }

        private Dictionary<ChartSeriesType, bool> PrepareChartCategoryAxisConfigurationOptions()
        {
            Dictionary<ChartSeriesType, bool> hasCategoryAxis = new Dictionary<ChartSeriesType, bool>() 
            {
                { ChartSeriesType.Area, true },
                { ChartSeriesType.Bar, true },
                { ChartSeriesType.Column, true },
                { ChartSeriesType.Line, true },
                { ChartSeriesType.VerticalArea, true },
                { ChartSeriesType.VerticalLine, true },
                { ChartSeriesType.RadarArea, true },
                { ChartSeriesType.RadarColumn, true },
                { ChartSeriesType.RadarLine, true },
                { ChartSeriesType.BoxPlot, true },
                { ChartSeriesType.Bubble, false },
                { ChartSeriesType.Bullet, true },
                { ChartSeriesType.VerticalBullet, true },
                { ChartSeriesType.CandleStick, true },
                { ChartSeriesType.OHLC, true },
                { ChartSeriesType.Funnel, false },
                { ChartSeriesType.RangeColumn, true },
                { ChartSeriesType.RangeBar, true },
                { ChartSeriesType.Pie, false },
                { ChartSeriesType.Donut, false },
                { ChartSeriesType.Scatter, false },
                { ChartSeriesType.ScatterLine, false },
                { ChartSeriesType.PolarArea, false },
                { ChartSeriesType.PolarLine, false },
                { ChartSeriesType.PolarScatter, false },
                { ChartSeriesType.Waterfall, true },
                { ChartSeriesType.HorizontalWaterfall, true }
            };

            return hasCategoryAxis;
        }
    }
}
