using Kendo.Mvc.Examples.Models;
using Kendo.Mvc.Extensions;
using Kendo.Mvc.UI;
using System.Collections.Generic;
using System.Web.Mvc;

namespace Kendo.Mvc.Examples.Controllers
{
    public partial class MediaPlayerController : Controller
    {

        public MediaPlayerController()
        {
        }

        public ActionResult Index()
        {
            List<Video> videos = new List<Video>();
            videos.Add(new Video()
            {
                url = @"\Content\web\mediaplayer\Video1.mp4",
                title = "Digital Transformation: A New Way of Thinking",
                poster = @"\Content\web\mediaplayer\Video1.jpg"

            });
            videos.Add(new Video()
            {
                url = @"\Content\web\mediaplayer\Video2.mp4",
                title = "Learn How York Solved Its Database Problem",
                poster = @"\Content\web\mediaplayer\Video2.jpg"
            });
            videos.Add(new Video()
            {
                url = @"\Content\web\mediaplayer\Video3.mp4",
                title = "A Clear Vision for Digital Transformation",
                poster = @"\Content\web\mediaplayer\Video3.jpg"
            });
            ViewBag.Videos = videos;

            return View();
        }
    }
}