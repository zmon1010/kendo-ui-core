using Microsoft.Win32;
using System;
using System.Text;

namespace Kendo.Mvc.Infrastructure.Licensing
{
    internal static class RegistryUtilities
    {
        private const string REGISTRY_SUB_KEY = "Software\\Telerik\\MVC";

        internal static bool RegistryKeyExists(string registryKeyString)
        {
            // TODO Add second check

            bool keyExists = false;

            try
            {
                using (RegistryKey registryKey = Registry.CurrentUser.OpenSubKey(REGISTRY_SUB_KEY))
                {
                    keyExists = registryKey != null;

                    if (registryKey != null)
                    {
                        string value = registryKey.GetValue(registryKeyString) as string;
                        keyExists = (value == null ? false : value.Length > 0);
                    }
                }
            }
            catch
            {
                keyExists = false;
            }

            return keyExists;
        }

        internal static void SaveRegistryString(string key, DateTime date)
        {
            try
            {
                using (RegistryKey registryKey = Registry.CurrentUser.CreateSubKey(REGISTRY_SUB_KEY))
                {
                    if (registryKey != null)
                    {
                        // TODO Encode date differently

                        registryKey.SetValue(key, date.ToBinary());
                    }
                }
            }
            catch { }
        }

        internal static DateTime ReadRegistryString(string key, DateTime defaultValue)
        {
            DateTime result = defaultValue;

            try
            {
                using (RegistryKey registryKey = Registry.CurrentUser.OpenSubKey(REGISTRY_SUB_KEY))
                {
                    if (registryKey != null)
                    {
                        // TODO Encode date differently

                        string dateString = registryKey.GetValue(key) as string;

                        long dateBinary = defaultValue.ToBinary();

                        if (long.TryParse(dateString, out dateBinary))
                        {
                            result = DateTime.FromBinary(dateBinary);
                        }
                    }
                }
            }
            catch
            {
                result = defaultValue;
            }

            return result;
        }

        internal static string EncodeString(string baseString)
        {
            var bytes = Encoding.UTF8.GetBytes(baseString);
            var base64String = Convert.ToBase64String(bytes);
            var unpaddedString = base64String.TrimEnd(new char[] { '=' });
            var reversedString = RegistryUtilities.ReverseString(unpaddedString);

            return reversedString;
        }

        internal static string DecodeString(string baseString)
        {
            var reversedString = RegistryUtilities.ReverseString(baseString);
            var paddedString = reversedString.PadRight(reversedString.Length + 3 & -4, '=');
            var bytes = Convert.FromBase64String(paddedString);
            var resultString = Encoding.UTF8.GetString(bytes);

            return resultString;
        }

        internal static string ReverseString(string baseString)
        {
            char[] charArray = baseString.ToCharArray();

            Array.Reverse(charArray);

            return new string(charArray);
        }
    }
}