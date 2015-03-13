namespace Kendo.Mvc.UI.Fluent
{
    using Extensions;
    using System;
    using System.Linq.Expressions;

    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="DataSource"/> Model definition.
    /// </summary>
    /// <typeparam name="TModel">Type of the model</typeparam>
    public class DataSourceTreeListModelDescriptorFactory<TModel> : DataSourceModelDescriptorFactory<TModel>, IHideObjectMembers
        where TModel : class
    {
        private TreeListModelDescriptor treelistModel;

        public DataSourceTreeListModelDescriptorFactory(TreeListModelDescriptor model)
          : base(model)
        {
            treelistModel = model;
        }

        /// <summary>
        /// Specify the member used for the parentId field.
        /// </summary>
        /// <param name="expression">Member access expression which describes the member</param>
        public DataSourceModelFieldDescriptorBuilder<TValue> ParentId<TValue>(Expression<Func<TModel, TValue>> expression)
        {
            treelistModel.ParentId = expression.MemberWithoutInstance();

            return AddFieldDescriptor<TValue>(treelistModel.ParentId, typeof(TValue));
        }

        /// <summary>
        /// Specify the member used for the parentId field.
        /// </summary>
        /// <param name="fieldName">The member name.</param>
        /// <typeparam name="TValue">Type of the field</typeparam>
        public virtual DataSourceModelFieldDescriptorBuilder<TValue> ParentId<TValue>(string memberName)
        {
            treelistModel.ParentId = memberName;

            return AddFieldDescriptor<TValue>(memberName, typeof(TValue));
        }

        /// <summary>
        /// Specify the member used for the expanded field.
        /// </summary>
        /// <param name="expression">Member access expression which describes the member</param>
        public DataSourceModelFieldDescriptorBuilder<TValue> Expanded<TValue>(Expression<Func<TModel, TValue>> expression)
        {
            treelistModel.Expanded = expression.MemberWithoutInstance();

            return AddFieldDescriptor<TValue>((string)treelistModel.Expanded, typeof(TValue));
        }

        /// <summary>
        /// Specify the member used for the expanded field.
        /// </summary>
        /// <param name="fieldName">The member name.</param>
        /// <typeparam name="TValue">Type of the field</typeparam>
        public virtual DataSourceModelFieldDescriptorBuilder<TValue> Expanded<TValue>(string memberName)
        {
            treelistModel.Expanded = memberName;

            return AddFieldDescriptor<TValue>(memberName, typeof(TValue));
        }

        /// <summary>
        /// Specify the default value of the expanded field.
        /// </summary>
        /// <param name="fieldName">The member name.</param>
        /// <typeparam name="TValue">Type of the field</typeparam>
        public virtual DataSourceTreeListModelDescriptorFactory<TModel> Expanded(bool defaultValue)
        {
            treelistModel.Expanded = defaultValue;

            return this;
        }
    }
}
