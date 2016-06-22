using System;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring MapLayer
    /// </summary>
    public partial class MapLayerBuilder
        
    {
        public MapLayerBuilder(MapLayer container)
        {
            Container = container;
        }

        protected MapLayer Container
        {
            get;
            private set;
        }

        /// <summary>
        /// Configures the data source of the map layer.
        /// </summary>
        /// <param name="configurator">The configuration of the data source.</param>
        /// <returns></returns>
        public MapLayerBuilder DataSource(Action<MapLayerDataSourceBuilder> configurator)
        {
            Container.DataSource = new DataSource(Container.Map.ModelMetadataProvider);
            configurator(new MapLayerDataSourceBuilder(Container.DataSource, Container.Map.ViewContext, Container.Map.UrlGenerator));

            return this;
        }
    }
}
