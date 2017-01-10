using System.Collections.Generic;

namespace Kendo.Mvc.Examples.Models.Upload
{
    public class UploadConfigModel
    {
        public string[] Extensions { get; private set; }

        public UploadConfigModel(params string[] extensions)
        {
            Extensions = extensions;
        }
    }
}
