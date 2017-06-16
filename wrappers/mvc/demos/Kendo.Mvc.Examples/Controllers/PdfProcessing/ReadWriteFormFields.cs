using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.Mvc;
using Telerik.Windows.Documents.Fixed.FormatProviders.Pdf;
using Telerik.Windows.Documents.Fixed.FormatProviders.Pdf.Export;
using Telerik.Windows.Documents.Fixed.Model;
using Telerik.Windows.Documents.Fixed.Model.InteractiveForms;

namespace Kendo.Mvc.Examples.Controllers
{
    public partial class PdfProcessingController : Controller
    {
        [Demo]
        public ActionResult Read_Write_Form_Fields()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Download_Modified_Document(string textbox, string textArea, string rb, bool cb1, bool cb2 , bool cb3)
        {
            var values = textArea;
            string[] lines = Regex.Split(values, "\r\n");
            string mimeType = String.Empty;
            string fileDownloadName = "test.pdf";

            string fileName = Server.MapPath("~/Content/web/pdfprocessing/InteractiveForms.pdf");
            using (FileStream input = new FileStream(fileName, FileMode.Open))
            {
                RadFixedDocument document = new PdfFormatProvider().Import(input);
                foreach (FormField field in document.AcroForm.FormFields)
                {
                    switch (field.FieldType)
                    {
                        case FormFieldType.TextBox:
                            ProcessTextBox((TextBoxField) field, textbox);
                            break;
                        case FormFieldType.ListBox:
                            ProcessListBox((ListBoxField) field, lines);
                            break;
                        case FormFieldType.RadioButton:
                            ProcessRadioButtons((RadioButtonField) field, rb);
                            break;
                        case FormFieldType.CheckBox:
                            ProcessCheckBoxes((CheckBoxField) field, cb1, cb2, cb3);
                            break;

                    }
                }



                fileDownloadName = String.Format(fileDownloadName, "SampleDocument", "pdf");

                PdfFormatProvider formatProvider = new PdfFormatProvider();
                formatProvider.ExportSettings.ImageQuality = ImageQuality.High;
                mimeType = "application/pdf";


                byte[] renderedBytes = null;

                using (MemoryStream ms = new MemoryStream())
                {
                    formatProvider.Export(document, ms);
                    renderedBytes = ms.ToArray();
                }

                return File(renderedBytes, mimeType, fileDownloadName);
            }
        }

        private static void ProcessTextBox(TextBoxField textBoxField, string textboxValue)
        {

            textBoxField.Value = textboxValue;

        }

        private static void ProcessListBox(ListBoxField listField, string[] values)
        {

            listField.Options.Clear();
            if (values.Length > 1)
            {

                foreach (string value in values)
                {

                    ChoiceOption option = new ChoiceOption(value);
                    listField.Options.Add(option);
                    listField.Value = new ChoiceOption[] { option };
                }
            }
        }

        private static void ProcessRadioButtons(RadioButtonField radioField, string radioButtonValue)
        {
            object checkedContent = null;

            if (radioButtonValue == "1")
            {
                checkedContent = "Option 1";
            }
            else if (radioButtonValue == "2")
            {
                checkedContent = "Option 2";
            }
            else if (radioButtonValue == "3")
            {
                checkedContent = "Option 3";
            }


            if (checkedContent != null)
            {
                radioField.Value = radioField.Options.Where(x => x.Value == checkedContent.ToString()).FirstOrDefault();
            }
        }

        private static void ProcessCheckBoxes(CheckBoxField checkBoxField, bool cb1, bool cb2, bool cb3)
        {


            if (checkBoxField.Name.Contains("1"))
            {
                checkBoxField.IsChecked = cb1;
            }
            else if (checkBoxField.Name.Contains("2"))
            {
                checkBoxField.IsChecked = cb2;
            }
            else if (checkBoxField.Name.Contains("3"))
            {
                checkBoxField.IsChecked = cb3;
            }

        }
    }
}
