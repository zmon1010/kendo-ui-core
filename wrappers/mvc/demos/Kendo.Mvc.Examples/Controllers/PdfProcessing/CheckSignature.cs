using Kendo.Mvc.Examples.Models;
using System;
using System.IO;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Web;
using System.Web.Mvc;
using Telerik.Windows.Documents.Fixed.FormatProviders.Pdf;
using Telerik.Windows.Documents.Fixed.FormatProviders.Pdf.Export;
using Telerik.Windows.Documents.Fixed.Model;
using Telerik.Windows.Documents.Fixed.Model.DigitalSignatures;
using Telerik.Windows.Documents.Fixed.Model.InteractiveForms;

namespace Kendo.Mvc.Examples.Controllers
{
    public partial class PdfProcessingController : Controller
    {
        [Demo]

        public ActionResult Check_Pdf_Signature(HttpPostedFileBase customDocument, SignatureFieldsModel model, string selectedItem)
        {
            X509VerificationFlags verificationFlags;

            verificationFlags = X509VerificationFlags.NoFlag;
            string item = "";
            if (selectedItem != null)
            {
                
                string[] items = selectedItem.Trim().Split(' ');
                item = items[0];
            }
            
            string selectedOption = item;

            if(customDocument == null && selectedOption == "")
            {
                return View(new SignatureFieldsModel { IsDocumentModified = false, IsCertificateValid = false, SignerInformation="", HashAlgorithm="", ImgUrl= "/Content/web/pdfprocessing/Unknown.png" });
            }

            else if(selectedOption != null && selectedOption != "")
            {
                string fileName = "";

                if (selectedOption == "Valid")
                {
                    fileName = Server.MapPath("~/Content/web/pdfprocessing/Unknown.pdf");
                    verificationFlags = X509VerificationFlags.AllowUnknownCertificateAuthority;
                    model.ImgUrl = "~/Content/web/pdfprocessing/Valid.png";
                }

                if (selectedOption == "Unknown")
                {
                    fileName = Server.MapPath("~/Content/web/pdfprocessing/Unknown.pdf");
                    verificationFlags = X509VerificationFlags.NoFlag;
                    model.ImgUrl = "~/Content/web/pdfprocessing/Unknown.png";
                }

                if (selectedOption == "Invalid")
                {
                    fileName = Server.MapPath("~/Content/web/pdfprocessing/Invalid.pdf");
                    verificationFlags = X509VerificationFlags.NoFlag;
                    model.ImgUrl = "~/Content/web/pdfprocessing/Invalid.png";
                }



                using (FileStream input = new FileStream(fileName, FileMode.Open))
                {
                    RadFixedDocument DownLoadedDocument = new PdfFormatProvider().Import(input);

                    PdfFormatProvider formatProvider = new PdfFormatProvider();

                    var firstSignatureFieldLoaded = DownLoadedDocument.AcroForm.FormFields.FirstOrDefault(field => field.FieldType == FormFieldType.Signature) as SignatureField;

                    if (firstSignatureFieldLoaded != null && firstSignatureFieldLoaded.Signature != null)
                    {
                        SignatureValidationProperties properties = new SignatureValidationProperties();
                        properties.Chain.ChainPolicy.VerificationFlags = verificationFlags;

                        SignatureValidationResult validationResult;
                        if (firstSignatureFieldLoaded.Signature.TryValidate(properties, out validationResult))
                        {

                            model.IsDocumentModified = validationResult.IsDocumentModified;
                            model.IsCertificateValid = validationResult.IsCertificateValid;
                            model.SignerInformation = validationResult.SignerInformation;
                            model.HashAlgorithm = validationResult.HashAlgorithm.FriendlyName;
                            
                        }
                        else
                        {

                            model.IsDocumentModified = false;
                            model.IsCertificateValid = false;
                            model.SignerInformation = "Corrupted signature.";
                            model.HashAlgorithm = string.Empty;
                            
                        }
                    }
                    else
                    {

                        model.IsDocumentModified = false;
                        model.IsCertificateValid = false;
                        model.SignerInformation = "No signature.";
                        model.HashAlgorithm = string.Empty;
                        
                    }

                }

                return View(model);
            }

            string fileDownloadName = "test.pdf";
            string mimeType = "application/pdf";



            RadFixedDocument document = new PdfFormatProvider().Import(customDocument.InputStream);
            fileDownloadName = String.Format(fileDownloadName, Path.GetFileNameWithoutExtension(customDocument.FileName));

            var firstSignatureField = document.AcroForm.FormFields.FirstOrDefault(field => field.FieldType == FormFieldType.Signature) as SignatureField;

            if (firstSignatureField != null && firstSignatureField.Signature != null)
            {
                SignatureValidationProperties properties = new SignatureValidationProperties();
                properties.Chain.ChainPolicy.VerificationFlags = verificationFlags;

                SignatureValidationResult validationResult;
                if (firstSignatureField.Signature.TryValidate(properties, out validationResult))
                {

                    model.IsDocumentModified = validationResult.IsDocumentModified;
                    model.IsCertificateValid = validationResult.IsCertificateValid;
                    model.SignerInformation = validationResult.SignerInformation;
                    model.HashAlgorithm = validationResult.HashAlgorithm.FriendlyName;
                    if (validationResult.IsCertificateValid)
                    {
                        model.ImgUrl = "~/Content/web/pdfprocessing/Valid.png";
                    }
                    else
                    {
                        model.ImgUrl = "~/Content/web/pdfprocessing/Invalid.png";

                    }
                    
                }
                else
                {

                    model.IsDocumentModified = false;
                    model.IsCertificateValid = false;
                    model.SignerInformation = "Corrupted signature.";
                    model.HashAlgorithm = string.Empty;
                    model.ImgUrl = "~/Content/web/pdfprocessing/Unknown.png";
                }
            }
            else
            {

                model.IsDocumentModified = false;
                model.IsCertificateValid = false;
                model.SignerInformation = "No signature.";
                model.HashAlgorithm = string.Empty;
                model.ImgUrl = "~/Content/web/pdfprocessing/Unknown.png";
            }

            return View(model);
        }
    }
}
