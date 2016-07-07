using Microsoft.Win32;
using System;
using System.Text;

namespace Kendo.Mvc.Infrastructure.Licensing
{
    internal static class RegistryUtilities
    {
        internal static bool RegistryKeyExists(string registrySubKey, string key)
        {
            string registryStringValue = RegistryUtilities.ReadRegistryString(registrySubKey, key);

            bool keyExists = registryStringValue != null;

            return keyExists;
        }

        internal static void SaveRegistryDate(string registrySubKey, string key, DateTime date)
        {
            RegistryUtilities.SaveRegistryString(registrySubKey, key, date.ToBinary().ToString());
        }

        internal static void SaveRegistryString(string registrySubKey, string key, string valueString)
        {
            try
            {
                using (RegistryKey registryKey = Registry.CurrentUser.CreateSubKey(registrySubKey))
                {
                    if (registryKey != null)
                    {
                        var encodedValueString = RegistryUtilities.EncodeString(valueString);
                        string encodedKeyString = RegistryUtilities.EncodeString(key);

                        registryKey.SetValue(encodedKeyString, encodedValueString);
                    }
                }
            }
            catch { }
        }

        internal static DateTime ReadRegistryDate(string registrySubKey, string key, DateTime defaultValue)
        {
            DateTime result = defaultValue;

            string dateString = RegistryUtilities.ReadRegistryString(registrySubKey, key);

            if (dateString != null)
            {
                long dateBinary = defaultValue.ToBinary();

                if (long.TryParse(dateString, out dateBinary))
                {
                    result = DateTime.FromBinary(dateBinary);
                }
            }

            return result;
        }

        internal static string ReadRegistryString(string registrySubKey, string key)
        {
            string result = null;

            try
            {
                using (RegistryKey registryKey = Registry.CurrentUser.OpenSubKey(registrySubKey))
                {
                    if (registryKey != null)
                    {
                        string encodedKeyString = RegistryUtilities.EncodeString(key);

                        string encodedResult = registryKey.GetValue(encodedKeyString) as string;

                        result = RegistryUtilities.DecodeString(encodedResult);
                    }
                }
            }
            catch
            {
                result = null;
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