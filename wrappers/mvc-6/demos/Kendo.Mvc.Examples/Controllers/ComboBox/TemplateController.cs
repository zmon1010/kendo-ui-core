using Microsoft.AspNetCore.Mvc;

namespace Kendo.Mvc.Examples.Controllers
{
    public partial class ComboBoxController : BaseController
    {
        [Demo]
        public ActionResult Template()
        {
            return View();
        }
    }
}