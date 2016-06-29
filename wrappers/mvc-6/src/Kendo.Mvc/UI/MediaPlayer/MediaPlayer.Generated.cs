using Kendo.Mvc.Extensions;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Kendo.Mvc.UI
{
    /// <summary>
    /// Kendo UI MediaPlayer component
    /// </summary>
    public partial class MediaPlayer<T> where T : class 
    {

        protected override Dictionary<string, object> SerializeSettings()
        {
            var settings = base.SerializeSettings();

            return settings;
        }
    }
}
