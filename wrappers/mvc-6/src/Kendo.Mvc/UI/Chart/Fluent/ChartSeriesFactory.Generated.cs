using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq.Expressions;
using Kendo.Mvc.Extensions;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring List<ChartSeries<T>>
    /// </summary>
    public partial class ChartSeriesFactory<T> where T : class
    {
        /// <summary>
        /// Defines area series bound to inline data.
        /// </summary>
        /// <param name="data">
        /// The list of data items to bind to
        /// </param>
        public virtual ChartSeriesBuilder<T> Area(IEnumerable data)
        {
            var item = new ChartSeries<T>()
            {
                Type = "area",
                Data = data
            };

            item.Chart = Chart;
            Container.Add(item);

            return new ChartSeriesBuilder<T>(item);
        }

        /// <summary>
        /// Defines area series bound to model member(s).
        /// </summary>
        /// <param name="expression">
        /// The expression used to extract the value from the model.
        /// </param>
        public virtual ChartSeriesBuilder<T>  Area<TValue>(
            Expression<Func<T, TValue>> expression)
        {
            return Area(expression.MemberWithoutInstance());
        }

        /// <summary>
        /// Defines area series bound to model member(s).
        /// </summary>
        /// <param name="expression">
        /// The expression used to extract the value from the model.
        /// </param>
        /// <param name="categoryExpression">
        /// The expression used to extract the category from the model.
        /// </param>
        public virtual ChartSeriesBuilder<T>  Area<TValue, TCategory>(
            Expression<Func<T, TValue>> expression,
            Expression<Func<T, TCategory>> categoryExpression)
        {
            return Area(expression.MemberWithoutInstance(), categoryExpression.MemberWithoutInstance());
        }

        /// <summary>
        /// Defines bound area series.
        /// </summary>
        /// <param name="memberName">
        /// The name of the value member.
        /// </param>
        /// <param name="categoryMemberName">
        /// The name of the category member. Optional.
        /// </param>
        public virtual ChartSeriesBuilder<T> Area(
            string memberName,
            string categoryMemberName = null)
        {
            var item = new ChartSeries<T>()
            {
                Chart = Chart,
                Type = "area",
                Name = memberName.AsTitle(),
                Field = memberName,
                CategoryField = categoryMemberName
            };

            Container.Add(item);

            return new ChartSeriesBuilder<T>(item);
        }
        /// <summary>
        /// Defines bar series bound to inline data.
        /// </summary>
        /// <param name="data">
        /// The list of data items to bind to
        /// </param>
        public virtual ChartSeriesBuilder<T> Bar(IEnumerable data)
        {
            var item = new ChartSeries<T>()
            {
                Type = "bar",
                Data = data
            };

            item.Chart = Chart;
            Container.Add(item);

            return new ChartSeriesBuilder<T>(item);
        }

        /// <summary>
        /// Defines bar series bound to model member(s).
        /// </summary>
        /// <param name="expression">
        /// The expression used to extract the value from the model.
        /// </param>
        public virtual ChartSeriesBuilder<T>  Bar<TValue>(
            Expression<Func<T, TValue>> expression)
        {
            return Bar(expression.MemberWithoutInstance());
        }

        /// <summary>
        /// Defines bar series bound to model member(s).
        /// </summary>
        /// <param name="expression">
        /// The expression used to extract the value from the model.
        /// </param>
        /// <param name="categoryExpression">
        /// The expression used to extract the category from the model.
        /// </param>
        public virtual ChartSeriesBuilder<T>  Bar<TValue, TCategory>(
            Expression<Func<T, TValue>> expression,
            Expression<Func<T, TCategory>> categoryExpression)
        {
            return Bar(expression.MemberWithoutInstance(), categoryExpression.MemberWithoutInstance());
        }

        /// <summary>
        /// Defines bound bar series.
        /// </summary>
        /// <param name="memberName">
        /// The name of the value member.
        /// </param>
        /// <param name="categoryMemberName">
        /// The name of the category member. Optional.
        /// </param>
        public virtual ChartSeriesBuilder<T> Bar(
            string memberName,
            string categoryMemberName = null)
        {
            var item = new ChartSeries<T>()
            {
                Chart = Chart,
                Type = "bar",
                Name = memberName.AsTitle(),
                Field = memberName,
                CategoryField = categoryMemberName
            };

            Container.Add(item);

            return new ChartSeriesBuilder<T>(item);
        }
        /// <summary>
        /// Defines bubble series bound to inline data.
        /// </summary>
        /// <param name="data">
        /// The list of data items to bind to
        /// </param>
        public virtual ChartSeriesBuilder<T> Bubble(IEnumerable data)
        {
            var item = new ChartSeries<T>()
            {
                Type = "bubble",
                Data = data
            };

            item.Chart = Chart;
            Container.Add(item);

            return new ChartSeriesBuilder<T>(item);
        }

        /// <summary>
        /// Defines bubble series bound to model member(s).
        /// </summary>
        /// <param name="xValueExpression">
        /// The expression used to extract the The x value. from the model.
        /// </param>
        /// <param name="yValueExpression">
        /// The expression used to extract the The y value. from the model.
        /// </param>
        /// <param name="sizeExpression">
        /// The expression used to extract the The size value. from the model.
        /// </param>
        public virtual ChartSeriesBuilder<T>  Bubble<TXValue, TYValue, TSizeValue>(
            Expression<Func<T, TXValue>> xValueExpression,
            Expression<Func<T, TYValue>> yValueExpression,
            Expression<Func<T, TSizeValue>> sizeExpression)
        {
            return Bubble(xValueExpression.MemberWithoutInstance(), yValueExpression.MemberWithoutInstance(), sizeExpression.MemberWithoutInstance());
        }

        /// <summary>
        /// Defines bubble series bound to model member(s).
        /// </summary>
        /// <param name="xValueExpression">
        /// The expression used to extract the The x value. from the model.
        /// </param>
        /// <param name="yValueExpression">
        /// The expression used to extract the The y value. from the model.
        /// </param>
        /// <param name="sizeExpression">
        /// The expression used to extract the The size value. from the model.
        /// </param>
        /// <param name="categoryExpression">
        /// The expression used to extract the category from the model.
        /// </param>
        public virtual ChartSeriesBuilder<T>  Bubble<TXValue, TYValue, TSizeValue, TCategory>(
            Expression<Func<T, TXValue>> xValueExpression,
            Expression<Func<T, TYValue>> yValueExpression,
            Expression<Func<T, TSizeValue>> sizeExpression,
            Expression<Func<T, TCategory>> categoryExpression)
        {
            return Bubble(xValueExpression.MemberWithoutInstance(), yValueExpression.MemberWithoutInstance(), sizeExpression.MemberWithoutInstance(), categoryExpression.MemberWithoutInstance());
        }

        /// <summary>
        /// Defines bound bubble series.
        /// </summary>
        /// <param name="xMemberName">
        /// The name of the The x value. member.
        /// </param>
        /// <param name="yMemberName">
        /// The name of the The y value. member.
        /// </param>
        /// <param name="sizeMemberName">
        /// The name of the The size value. member.
        /// </param>
        /// <param name="categoryMemberName">
        /// The name of the category member. Optional.
        /// </param>
        public virtual ChartSeriesBuilder<T> Bubble(
            string xMemberName,
            string yMemberName,
            string sizeMemberName,
            string categoryMemberName = null)
        {
            var item = new ChartSeries<T>()
            {
                Chart = Chart,
                Type = "bubble",
                Name = xMemberName.AsTitle() + ", " + yMemberName.AsTitle() + ", " + sizeMemberName.AsTitle(),
                XField = xMemberName,
                YField = yMemberName,
                SizeField = sizeMemberName,
                CategoryField = categoryMemberName
            };

            Container.Add(item);

            return new ChartSeriesBuilder<T>(item);
        }
        /// <summary>
        /// Defines candlestick series bound to inline data.
        /// </summary>
        /// <param name="data">
        /// The list of data items to bind to
        /// </param>
        public virtual ChartSeriesBuilder<T> Candlestick(IEnumerable data)
        {
            var item = new ChartSeries<T>()
            {
                Type = "candlestick",
                Data = data
            };

            item.Chart = Chart;
            Container.Add(item);

            return new ChartSeriesBuilder<T>(item);
        }

        /// <summary>
        /// Defines candlestick series bound to model member(s).
        /// </summary>
        /// <param name="openExpression">
        /// The expression used to extract the The open value. from the model.
        /// </param>
        /// <param name="highExpression">
        /// The expression used to extract the The high value. from the model.
        /// </param>
        /// <param name="lowExpression">
        /// The expression used to extract the The low value. from the model.
        /// </param>
        /// <param name="closeExpression">
        /// The expression used to extract the The close value. from the model.
        /// </param>
        public virtual ChartSeriesBuilder<T>  Candlestick<TValue>(
            Expression<Func<T, TValue>> openExpression,
            Expression<Func<T, TValue>> highExpression,
            Expression<Func<T, TValue>> lowExpression,
            Expression<Func<T, TValue>> closeExpression)
        {
            return Candlestick(openExpression.MemberWithoutInstance(), highExpression.MemberWithoutInstance(), lowExpression.MemberWithoutInstance(), closeExpression.MemberWithoutInstance());
        }

        /// <summary>
        /// Defines bound candlestick series.
        /// </summary>
        /// <param name="openMemberName">
        /// The name of the The open value. member.
        /// </param>
        /// <param name="highMemberName">
        /// The name of the The high value. member.
        /// </param>
        /// <param name="lowMemberName">
        /// The name of the The low value. member.
        /// </param>
        /// <param name="closeMemberName">
        /// The name of the The close value. member.
        /// </param>
        public virtual ChartSeriesBuilder<T> Candlestick(
            string openMemberName,
            string highMemberName,
            string lowMemberName,
            string closeMemberName)
        {
            var item = new ChartSeries<T>()
            {
                Chart = Chart,
                Type = "candlestick",
                Name = openMemberName.AsTitle() + ", " + highMemberName.AsTitle() + ", " + lowMemberName.AsTitle() + ", " + closeMemberName.AsTitle(),
                OpenField = openMemberName,
                HighField = highMemberName,
                LowField = lowMemberName,
                CloseField = closeMemberName
            };

            Container.Add(item);

            return new ChartSeriesBuilder<T>(item);
        }
        /// <summary>
        /// Defines column series bound to inline data.
        /// </summary>
        /// <param name="data">
        /// The list of data items to bind to
        /// </param>
        public virtual ChartSeriesBuilder<T> Column(IEnumerable data)
        {
            var item = new ChartSeries<T>()
            {
                Type = "column",
                Data = data
            };

            item.Chart = Chart;
            Container.Add(item);

            return new ChartSeriesBuilder<T>(item);
        }

        /// <summary>
        /// Defines column series bound to model member(s).
        /// </summary>
        /// <param name="expression">
        /// The expression used to extract the value from the model.
        /// </param>
        public virtual ChartSeriesBuilder<T>  Column<TValue>(
            Expression<Func<T, TValue>> expression)
        {
            return Column(expression.MemberWithoutInstance());
        }

        /// <summary>
        /// Defines column series bound to model member(s).
        /// </summary>
        /// <param name="expression">
        /// The expression used to extract the value from the model.
        /// </param>
        /// <param name="categoryExpression">
        /// The expression used to extract the category from the model.
        /// </param>
        public virtual ChartSeriesBuilder<T>  Column<TValue, TCategory>(
            Expression<Func<T, TValue>> expression,
            Expression<Func<T, TCategory>> categoryExpression)
        {
            return Column(expression.MemberWithoutInstance(), categoryExpression.MemberWithoutInstance());
        }

        /// <summary>
        /// Defines bound column series.
        /// </summary>
        /// <param name="memberName">
        /// The name of the value member.
        /// </param>
        /// <param name="categoryMemberName">
        /// The name of the category member. Optional.
        /// </param>
        public virtual ChartSeriesBuilder<T> Column(
            string memberName,
            string categoryMemberName = null)
        {
            var item = new ChartSeries<T>()
            {
                Chart = Chart,
                Type = "column",
                Name = memberName.AsTitle(),
                Field = memberName,
                CategoryField = categoryMemberName
            };

            Container.Add(item);

            return new ChartSeriesBuilder<T>(item);
        }
        /// <summary>
        /// Defines line series bound to inline data.
        /// </summary>
        /// <param name="data">
        /// The list of data items to bind to
        /// </param>
        public virtual ChartSeriesBuilder<T> Line(IEnumerable data)
        {
            var item = new ChartSeries<T>()
            {
                Type = "line",
                Data = data
            };

            item.Chart = Chart;
            Container.Add(item);

            return new ChartSeriesBuilder<T>(item);
        }

        /// <summary>
        /// Defines line series bound to model member(s).
        /// </summary>
        /// <param name="expression">
        /// The expression used to extract the value from the model.
        /// </param>
        public virtual ChartSeriesBuilder<T>  Line<TValue>(
            Expression<Func<T, TValue>> expression)
        {
            return Line(expression.MemberWithoutInstance());
        }

        /// <summary>
        /// Defines line series bound to model member(s).
        /// </summary>
        /// <param name="expression">
        /// The expression used to extract the value from the model.
        /// </param>
        /// <param name="categoryExpression">
        /// The expression used to extract the category from the model.
        /// </param>
        public virtual ChartSeriesBuilder<T>  Line<TValue, TCategory>(
            Expression<Func<T, TValue>> expression,
            Expression<Func<T, TCategory>> categoryExpression)
        {
            return Line(expression.MemberWithoutInstance(), categoryExpression.MemberWithoutInstance());
        }

        /// <summary>
        /// Defines bound line series.
        /// </summary>
        /// <param name="memberName">
        /// The name of the value member.
        /// </param>
        /// <param name="categoryMemberName">
        /// The name of the category member. Optional.
        /// </param>
        public virtual ChartSeriesBuilder<T> Line(
            string memberName,
            string categoryMemberName = null)
        {
            var item = new ChartSeries<T>()
            {
                Chart = Chart,
                Type = "line",
                Name = memberName.AsTitle(),
                Field = memberName,
                CategoryField = categoryMemberName
            };

            Container.Add(item);

            return new ChartSeriesBuilder<T>(item);
        }
        /// <summary>
        /// Defines scatter series bound to inline data.
        /// </summary>
        /// <param name="data">
        /// The list of data items to bind to
        /// </param>
        public virtual ChartSeriesBuilder<T> Scatter(IEnumerable data)
        {
            var item = new ChartSeries<T>()
            {
                Type = "scatter",
                Data = data
            };

            item.Chart = Chart;
            Container.Add(item);

            return new ChartSeriesBuilder<T>(item);
        }

        /// <summary>
        /// Defines scatter series bound to model member(s).
        /// </summary>
        /// <param name="xValueExpression">
        /// The expression used to extract the The x value. from the model.
        /// </param>
        /// <param name="yValueExpression">
        /// The expression used to extract the The y value. from the model.
        /// </param>
        public virtual ChartSeriesBuilder<T>  Scatter<TXValue, TYValue>(
            Expression<Func<T, TXValue>> xValueExpression,
            Expression<Func<T, TYValue>> yValueExpression)
        {
            return Scatter(xValueExpression.MemberWithoutInstance(), yValueExpression.MemberWithoutInstance());
        }

        /// <summary>
        /// Defines bound scatter series.
        /// </summary>
        /// <param name="xMemberName">
        /// The name of the The x value. member.
        /// </param>
        /// <param name="yMemberName">
        /// The name of the The y value. member.
        /// </param>
        public virtual ChartSeriesBuilder<T> Scatter(
            string xMemberName,
            string yMemberName)
        {
            var item = new ChartSeries<T>()
            {
                Chart = Chart,
                Type = "scatter",
                Name = xMemberName.AsTitle() + ", " + yMemberName.AsTitle(),
                XField = xMemberName,
                YField = yMemberName
            };

            Container.Add(item);

            return new ChartSeriesBuilder<T>(item);
        }
        /// <summary>
        /// Defines scatterLine series bound to inline data.
        /// </summary>
        /// <param name="data">
        /// The list of data items to bind to
        /// </param>
        public virtual ChartSeriesBuilder<T> ScatterLine(IEnumerable data)
        {
            var item = new ChartSeries<T>()
            {
                Type = "scatterLine",
                Data = data
            };

            item.Chart = Chart;
            Container.Add(item);

            return new ChartSeriesBuilder<T>(item);
        }

        /// <summary>
        /// Defines scatterLine series bound to model member(s).
        /// </summary>
        /// <param name="xValueExpression">
        /// The expression used to extract the The x value. from the model.
        /// </param>
        /// <param name="yValueExpression">
        /// The expression used to extract the The y value. from the model.
        /// </param>
        public virtual ChartSeriesBuilder<T>  ScatterLine<TXValue, TYValue>(
            Expression<Func<T, TXValue>> xValueExpression,
            Expression<Func<T, TYValue>> yValueExpression)
        {
            return ScatterLine(xValueExpression.MemberWithoutInstance(), yValueExpression.MemberWithoutInstance());
        }

        /// <summary>
        /// Defines bound scatterLine series.
        /// </summary>
        /// <param name="xMemberName">
        /// The name of the The x value. member.
        /// </param>
        /// <param name="yMemberName">
        /// The name of the The y value. member.
        /// </param>
        public virtual ChartSeriesBuilder<T> ScatterLine(
            string xMemberName,
            string yMemberName)
        {
            var item = new ChartSeries<T>()
            {
                Chart = Chart,
                Type = "scatterLine",
                Name = xMemberName.AsTitle() + ", " + yMemberName.AsTitle(),
                XField = xMemberName,
                YField = yMemberName
            };

            Container.Add(item);

            return new ChartSeriesBuilder<T>(item);
        }
    }
}
