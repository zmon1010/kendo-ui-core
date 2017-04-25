using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;

namespace Kendo.Mvc.Infrastructure.Licensing
{
    class KendoLicenseProvider : LicenseProvider
    {
        private readonly static object lockObject;

        private readonly static IDictionary<Type, KendoLicense> licenseDictionary;

        static KendoLicenseProvider()
        {
            KendoLicenseProvider.lockObject = new object();
            KendoLicenseProvider.licenseDictionary = new Dictionary<Type, KendoLicense>();
        }

        public override License GetLicense(LicenseContext context, Type type, object instance, bool allowExceptions)
        {
            return KendoLicenseProvider.Validate(type, instance);
        }

        internal static KendoLicense Validate(Type type, object instance)
        {
            KendoLicense license;

            if (!KendoLicenseProvider.licenseDictionary.TryGetValue(type, out license))
            {
                lock (KendoLicenseProvider.lockObject)
                {
                    if (!KendoLicenseProvider.licenseDictionary.TryGetValue(type, out license))
                    {
                        license = new KendoLicense(type);

                        KendoLicenseProvider.licenseDictionary.Add(type, license);
                    }
                }
            }

            if (license.LicenseStatus == KendoLicenseStatus.Full)
            {
                return license;
            }

            if (license.TrialDaysLeft < 0)
            {
                string message = string.Empty;

                if (license.IsExtended)
                {
                    message = "Your trial version of Telerik UI for ASP.NET MVC by Progress has expired. " +
                       "Purchase the commercial version now from www.telerik.com/purchase to keep building applications with the product" + license.ErrorCode;
                }
                else
                {
                    message = "Your trial version of Telerik UI for ASP.NET MVC by Progress has expired. " +
                       "Purchase the commercial version now from www.telerik.com/purchase or extend your " +
                       "trial with 15 more days by contacting trialextend@progress.com. ErrorCode: " + license.ErrorCode;
                }

                throw new LicenseException(license.Type, null, message);
            }

            return license;
        }
    }
}
