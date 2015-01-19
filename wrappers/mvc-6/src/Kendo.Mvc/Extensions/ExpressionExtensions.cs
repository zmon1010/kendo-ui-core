namespace Kendo.Mvc.Extensions
{
    using System.Linq.Expressions;
    using Microsoft.AspNet.Mvc.Rendering.Expressions;

    public static class ExpressionExtensions
    {
        public static string MemberWithoutInstance(this LambdaExpression expression)
        {
            return ExpressionHelper.GetExpressionText(expression);
        }
    }
}
