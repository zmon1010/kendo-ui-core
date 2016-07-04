using Kendo.Mvc.Examples.Models;
using Kendo.Mvc.Extensions;
using Kendo.Mvc.UI;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace Kendo.Mvc.Examples.Controllers
{
    public partial class MediaPlayerController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public ActionResult Videos_Read([DataSourceRequest] DataSourceRequest request)
        {
            List<Video> videos = new List<Video>();
            videos.Add(new Video()
            {
                 url= "http://www.webestools.com/page/media/videoTag/BigBuckBunny.ogg",
                 Title = "Act a fool"
            });
            videos.Add(new Video()
            {
                url = "https://www.youtube.com/watch?v=vr7Xy8POfEM&list=PLhyyDxxabfF9bN4zPBDP1I5tt5oWr4ZtB&index=2",
                Title = "Няма чакай"
            });
            return Json(videos.ToDataSourceResult(request));
        }
    }
}
