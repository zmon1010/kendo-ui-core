using Kendo.Mvc.Examples.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;

namespace Kendo.Mvc.Examples.Controllers
{
    public partial class NumericTextBoxController : Controller
    {
        private IProductService productService;

        public NumericTextBoxController(
            IProductService service)
        {
            productService = service;
        }

        [Demo]
        public ActionResult Tag_Helper()
        {
            var model = productService.Read().ToList();
            return View(model[1]);
        }
    }
}