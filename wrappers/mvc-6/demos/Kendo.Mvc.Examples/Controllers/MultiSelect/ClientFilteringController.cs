using Kendo.Mvc.Examples.Models;
using Microsoft.AspNetCore.Mvc;
using System.Linq;

namespace Kendo.Mvc.Examples.Controllers
{
    public partial class MultiSelectController : BaseController
    {
        [Demo]
        public ActionResult ClientFiltering()
        {
            return View();
        }
    }
}