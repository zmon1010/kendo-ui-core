using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;

namespace Kendo.Mvc.Examples.Controllers
{
    public partial class Bar_ChartsController : Controller
    {
        public IActionResult Logarithmic_Axis()
        {
            return View(GetFibonacciSequence(39));
        }

        private List<int> GetFibonacciSequence(int n)
        {
            var sequence = new List<int>() { 1, 1 };
            for (var i = 2; i < n; i++)
            {
                sequence.Add(sequence[i - 1] + sequence[i - 2]);
            }

            return sequence;
        }
    }
}