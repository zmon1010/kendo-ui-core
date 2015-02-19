namespace Kendo.Mvc.UI.Fluent
{    
    using Extensions;

    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="DataSource"/> Model definition.
    /// </summary>
    /// <typeparam name="TModel">Type of the model</typeparam>
    public abstract class DataSourceModelDescriptorFactoryBase<TModel> : IHideObjectMembers
        where TModel : class
    {
        protected readonly ModelDescriptor model;

        public DataSourceModelDescriptorFactoryBase(ModelDescriptor model)
        {
            this.model = model;
        }

        /// <summary>
        /// Specify the member used to identify an unique Model instance.
        /// </summary>
        /// <param name="fieldName">The member name.</param>
        protected void Id(string fieldName)
        {
            IModelDataKey<TModel> dataKey;
            if (typeof(TModel).IsDynamicObject())
            {
                var lambdaExpression = ExpressionBuilder.Expression<dynamic, object>(fieldName);
                dataKey = (IModelDataKey<TModel>)new ModelDynamicDataKey(fieldName, lambdaExpression);
            }
            else
            {
                dataKey = GetDataKeyForField(fieldName);
            }

            dataKey.RouteKey = dataKey.Name;

            model.Id = dataKey;
        }

        protected IModelDataKey<TModel> GetDataKeyForField(string fieldName)
        {
            var lambdaExpression = ExpressionBuilder.Lambda<TModel>(fieldName);
            var fieldType = typeof(ModelDataKey<,>).MakeGenericType(new[] { typeof(TModel), lambdaExpression.Body.Type });   
                                 
            var constructor = fieldType.GetConstructor(new[] { lambdaExpression.GetType() });

            return (IModelDataKey<TModel>)constructor.Invoke(new object[] { lambdaExpression });
        }
    }
}
