using System;
using System.Web.Script.Serialization;

namespace Kendo.Mvc.Infrastructure
{
    public class DefaultJavaScriptSerializer : JavaScriptSerializer, IJavaScriptSerializer
    {
        public DefaultJavaScriptSerializer()
        {
            this.MaxJsonLength = Int32.MaxValue;
        }
    }
}