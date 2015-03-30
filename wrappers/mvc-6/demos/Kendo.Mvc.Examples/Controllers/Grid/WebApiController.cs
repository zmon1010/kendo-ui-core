using System.Linq;
using Kendo.Mvc.Examples.Models;
using Kendo.Mvc.Extensions;
using Kendo.Mvc.UI;
using Microsoft.AspNet.Mvc;
using Microsoft.Data.Entity.Update;

namespace Kendo.Mvc.Examples.Controllers
{
	public partial class GridController : Controller
	{
		public ActionResult WebApi()
		{
			return View();
		}
	}

	[Route("api/[controller]")]
    public class ProductController : Controller
    {
		private readonly ProductService service;

        public ProductController()
		{
			service = new ProductService(new SampleEntitiesDataContext());
		}

		protected override void Dispose(bool disposing)
		{
			service.Dispose();

			base.Dispose(disposing);
		}

		// GET: api/values
		[HttpGet]
		public DataSourceResult Get([DataSourceRequest]DataSourceRequest request)
		{
			return service.Read().ToDataSourceResult(request);
		}

        // POST api/values
        [HttpPost]
        public IActionResult Post(ProductViewModel product)
        {
			if (!ModelState.IsValid)
			{
				return HttpBadRequest(ModelState.Values.SelectMany(v => v.Errors).Select(error => error.ErrorMessage));
            }

			service.Create(product);

			return new ObjectResult(new DataSourceResult { Data = new[] { product }, Total = 1 });
		}

        // PUT api/values/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, ProductViewModel product)
        {
			if (ModelState.IsValid && id == product.ProductID)
			{
				try
				{
					service.Update(product);
				}
				catch (DbUpdateConcurrencyException)
				{
					return new HttpNotFoundResult();
				}

				return new HttpStatusCodeResult(200);
            }
			else
			{
				return HttpBadRequest(ModelState.Values.SelectMany(v => v.Errors).Select(error => error.ErrorMessage));
			}
		}

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {	
			try
			{
				service.Destroy(new ProductViewModel { ProductID = id } );
			}
			catch (DbUpdateConcurrencyException)
			{
				return new HttpNotFoundResult();
			}

			return new HttpStatusCodeResult(200);
		}
    }
}
