using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using Newtonsoft.Json;
using System.Text;

namespace Kendo.Mvc.Examples.Controllers
{
	public partial class UploadController : Controller
	{
        public class ChunkMetaData
        {
            public string UploadUid { get; set; }
            public string FileName { get; set; }
            public string ContentType { get; set; }
            public int ChunkIndex { get; set; }
            public int TotalChunks { get; set; }
            public int TotalFileSize { get; set; }
        }

        public class FileResult
        {
            public bool uploaded { get; set; }
            public string fileUid { get; set; }
        }

        [Demo]
        public ActionResult ChunkUpload()
        {
            return View();
        }

        public void AppendToFile(string fullPath, IFormFile content)
        {
            try
            {
                using (FileStream stream = new FileStream(fullPath, FileMode.Append, FileAccess.Write, FileShare.ReadWrite))
                {
                    content.CopyTo(stream);
                }
            }
            catch (IOException ex)
            {
                throw ex;
            }
        }

        public ActionResult ChunkSave(IEnumerable<IFormFile> files, string metaData)
        {
            if (metaData == null)
            {
                return Save(files);
            }

            MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(metaData));

            JsonSerializer serializer = new JsonSerializer();
            ChunkMetaData chunkData;
            using (StreamReader streamReader = new StreamReader(ms))
            {
                chunkData = (ChunkMetaData)serializer.Deserialize(streamReader, typeof(ChunkMetaData));
            }

            string path = String.Empty;
            // The Name of the Upload component is "files"
            if (files != null)
            {
                foreach (var file in files)
                {
                    path = Path.Combine(HostingEnvironment.WebRootPath, "App_Data", chunkData.FileName);

                    //AppendToFile(path, file);
                }
            }

            FileResult fileBlob = new FileResult();
            fileBlob.uploaded = chunkData.TotalChunks <= chunkData.ChunkIndex;
            fileBlob.fileUid = chunkData.UploadUid;

            return Json(fileBlob);
        }
    }
}