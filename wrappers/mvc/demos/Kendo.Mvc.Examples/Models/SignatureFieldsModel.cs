using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Kendo.Mvc.Examples.Models
{
    public class SignatureFieldsModel
    {
        public bool IsDocumentModified { get; set; }
        public bool IsCertificateValid { get; set; }
        public string SignerInformation { get; set; }
        public string HashAlgorithm { get; set; }
        public string ImgUrl { get; set; }
    }
}