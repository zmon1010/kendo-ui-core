using System;
using System.Linq;

namespace Kendo.Mvc.Infrastructure.Licensing
{
	internal class KendoLicense : System.ComponentModel.License
    {
        private const int TRIAL_DURATION = 30;
        private const string TRIAL_START_KEY_PERFIX = "Telerik";
        private const string TRIAL_LAST_KEY_PERFIX = "TelerikLast";

        private int? _trialDaysLeft = null;

        public override string LicenseKey { get { return ""; } }

        internal Type Type { get; set; }

        internal KendoLicenseStatus LicenseStatus
        {
            get
            {
                KendoLicenseStatus status = KendoLicenseStatus.Full;
#if TRIAL
                status = KendoLicenseStatus.Trial;
#endif

                return status;
            }
        }

        internal string AssemblyVersion
        {
            get
            {
                return Type.Assembly.GetName().Version.ToString();
            }
        }

        internal int TrialDaysLeft
        {
            get
            {
                if (this.LicenseStatus == KendoLicenseStatus.Full)
                {
                    return int.MaxValue;
                }

                if (_trialDaysLeft != null)
                {
                    return _trialDaysLeft.Value;
                }

                DateTime trialStart = GetTrialStart();
                DateTime trialLastUse = GetTrialLastUse();

                _trialDaysLeft = TRIAL_DURATION - ((int)trialLastUse.Subtract(trialStart).TotalDays);

                return _trialDaysLeft.Value;
            }
        }

        private DateTime GetTrialStart()
        {
            string registryKeyString = string.Concat(TRIAL_START_KEY_PERFIX, AssemblyVersion);
            string encodedKeyString = RegistryUtilities.EncodeString(registryKeyString);
            DateTime trialStart = DateTime.MinValue;

            if (RegistryUtilities.RegistryKeyExists(encodedKeyString))
            {
                trialStart = RegistryUtilities.ReadRegistryString(encodedKeyString, DateTime.MinValue);
            }
            else
            {
                trialStart = DateTime.Now;

                RegistryUtilities.SaveRegistryString(encodedKeyString, trialStart);
            }

            return trialStart;
        }

        private DateTime GetTrialLastUse()
        {
            string registryKeyString = string.Concat(TRIAL_LAST_KEY_PERFIX, AssemblyVersion);
            string encodedKeyString = RegistryUtilities.EncodeString(registryKeyString);
            DateTime trialLastUse = DateTime.Now;
            DateTime lastRegisteredUse = RegistryUtilities.ReadRegistryString(encodedKeyString, DateTime.MinValue);

            if (lastRegisteredUse == DateTime.MinValue || lastRegisteredUse < trialLastUse)
            {
                RegistryUtilities.SaveRegistryString(encodedKeyString, trialLastUse);
            }
            else
            {
                trialLastUse = lastRegisteredUse;
            }

            return trialLastUse;
        }

        internal KendoLicense(System.Type type)
        {
            this.Type = type;
        }

        public override void Dispose()
        {
        }
    }
}
