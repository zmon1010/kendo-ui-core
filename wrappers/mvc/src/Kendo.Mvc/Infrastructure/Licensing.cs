using System;
using System.Collections.Generic;
using System.Text;
using System.Web;
using System.Reflection;

namespace Kendo.Mvc
{
#if TRIAL
	internal class Licensing
	{
        const string LicenseMessageTemplate = "You're using a trial version of Telerik UI for ASP.NET MVC by Progress. Purchase the commercial version now from <a href='http://www.telerik.com/purchase' target='_blank' style='color: blue;text-decoration:underline;'>www.telerik.com/purchase</a>.";

		string TrialMessageHtml
		{
			get
			{
				return FormatTrialMessage(LicenseMessageTemplate);
			}
		}

		string ProductName
		{
			get
			{
				return Assembly.GetExecutingAssembly().GetName().Name;
			}
		}

		string ProductVersion
		{
			get
			{
				return Assembly.GetExecutingAssembly().GetName().Version.ToString();
			}
		}

		internal Licensing()
		{

		}

		string AppendSpace()
		{
			var rnd = new Random();
			string space = " ";
			return space.PadLeft(rnd.Next(6), ' ');
		}

		string FormatTrialMessage(string message)
		{
			StringBuilder sb = new StringBuilder();
			sb.Append(AppendSpace());
			sb.Append(message);
			sb.Replace(". ", "." + AppendSpace());
			return sb.ToString();
		}

		internal string GetLicenseMessage()
		{
			string output = String.Empty;
			string validationMessage = this.TrialMessageHtml;

			if (HttpContext.Current == null)
			{
				return output;
			}

			int rv = 0;
			if (HttpContext.Current.Items.Contains("KendoRandomNumber"))
			{
                rv = (int)HttpContext.Current.Items["KendoRandomNumber"];
			}
			else
			{
				var rnd = new Random();
				rv = rnd.Next(30);
                HttpContext.Current.Items.Add("KendoRandomNumber", rv);
			}
			if (rv == 4)
			{
				output = validationMessage;
			}

			return output;
		}
	}

#endif
}
