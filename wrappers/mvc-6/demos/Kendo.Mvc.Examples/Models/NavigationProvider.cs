using Newtonsoft.Json;
using System.Collections.Generic;
using IOFile = System.IO.File;

namespace Kendo.Mvc.Examples.Models
{
    public static class NavigationProvider
    {
        public static IEnumerable<NavigationWidget> SuiteWidgets()
        {
            var navigationJson = IOFile.ReadAllText("~/shared/nav.json");
            return JsonConvert.DeserializeObject<IEnumerable<NavigationWidget>>(navigationJson);
        }
    }
}