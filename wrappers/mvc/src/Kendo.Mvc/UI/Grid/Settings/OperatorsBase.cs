using System.Collections.Generic;

namespace Kendo.Mvc.UI
{
    public abstract class OperatorsBase : JsonObject
    {
        public IDictionary<string, string> Operators { get; protected set; }

        internal T Clone<T>()
            where T : OperatorsBase, new()
        {
            var operators = new T()
            {
                Operators = new Dictionary<string, string>(this.Operators)
            };

            return operators;
        }
    }
}