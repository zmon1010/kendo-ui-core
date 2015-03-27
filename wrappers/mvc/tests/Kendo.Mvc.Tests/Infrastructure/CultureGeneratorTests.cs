namespace Kendo.Mvc.Infrastructure.Tests
{
    using Kendo.Mvc.Infrastructure;
    using System.Collections.Generic;
    using System.Globalization;
    using System.Web.Script.Serialization;
    using Xunit;
    using System.Text.RegularExpressions;
    using System.Collections;
    using System.Linq;

    public class CultureGeneratorTests
    {
        private const string TO_JSON_REGEX = "([,{])([^\"\\s]*?):";
        private const string REPLACEMENT_STRING = "$1\"$2\":";

        private static string[] numberNegativePatterns = new string[] { "(n)", "-n", "- n", "n-", "n -" };

        private static string[] currencyPositivePatterns = new string[] { "$n", "n$", "$ n", "n $" };
        private static string[] currencyNegativePatterns = new string[] { "($n)", "-$n", "$-n", "$n-", "(n$)", "-n$", "n-$", "n$-", "-n $", "-$ n", "n $-", "$ n-", "$ -n", "n- $", "($ n)", "(n $)" };

        private static string[] percentPositivePatterns = new string[] { "n %", "n%", "%n", "% n" };
        private static string[] percentNegativePatterns = new string[] { "-n %", "-n%", "-%n", "%-n", "%n-", "n-%", "n%-", "-% n", "n %-", "% n-", "% -n", "n- %" };

        [Fact]
        public void Generate_generates_current_culture_script()
        {
            var script = CultureGenerator.Generate();
            VerifyCulture(script, System.Threading.Thread.CurrentThread.CurrentCulture);
        }

        [Fact]
        public void Generate_generates_specified_culture_script()
        {
            var script = CultureGenerator.Generate("bg-BG");
            VerifyCulture(script, new CultureInfo("bg-BG"));
        }

        [Fact]
        public void Generate_generates_twelve_month_names_for_cultures_that_incorrectly_return_thirteen()
        {
            var script = CultureGenerator.Generate("en-GB");
            var cultureDictionary = ParseCultureScript(script.Substring(script.IndexOf("=") + 1));
            var dateFormat = (cultureDictionary["calendars"] as Dictionary<string, object>)["standard"] as Dictionary<string, object>;
            var months = dateFormat["months"] as Dictionary<string, object>;

            (months["names"] as IList).Count.ShouldEqual(12);
            (months["namesAbbr"] as IList).Count.ShouldEqual(12);
        }

        private void VerifyCulture(string script, CultureInfo cultureInfo)
        {
            var assignment = script.Substring(0, script.IndexOf("="));
            var cultureScript = script.Substring(script.IndexOf("=") + 1);
            var cultureDictionary = ParseCultureScript(cultureScript);

            assignment.ShouldEqual(string.Format("kendo.cultures[\"{0}\"]", cultureInfo.Name));
            cultureDictionary["name"].ShouldEqual(cultureInfo.Name);

            var numberFormat = cultureDictionary["numberFormat"] as Dictionary<string, object>;
            VerifyNumberFormats(numberFormat, cultureInfo);

            var dateFormat = (cultureDictionary["calendars"] as Dictionary<string, object>)["standard"] as Dictionary<string, object>;
            VerifyDateTimeFormats(dateFormat, cultureInfo);
        }

        private Dictionary<string, object> ParseCultureScript(string cultureScript)
        {
            var serializer = new JavaScriptSerializer();
            var jsonString = new Regex(TO_JSON_REGEX).Replace(cultureScript.Substring(0, cultureScript.Length - 1), REPLACEMENT_STRING);
            var cultureDictionary = serializer.Deserialize<Dictionary<string, object>>(jsonString);
            return cultureDictionary;
        }

        private void VerifyNumberFormats(Dictionary<string, object> numberFormat, CultureInfo cultureInfo)
        {
            var numberFormats = cultureInfo.NumberFormat;

            (numberFormat["pattern"] as IList).ShouldHaveSameItems(new string[] { numberNegativePatterns[numberFormats.NumberNegativePattern] });
            numberFormat["decimals"].ShouldEqual(numberFormats.NumberDecimalDigits);
            numberFormat[","].ShouldEqual(numberFormats.NumberGroupSeparator);
            numberFormat["."].ShouldEqual(numberFormats.NumberDecimalSeparator);
            (numberFormat["groupSize"] as IList).ShouldHaveSameItems(numberFormats.NumberGroupSizes);

            var currencyFormat = numberFormat["currency"] as Dictionary<string, object>;

            (currencyFormat["pattern"] as IList).ShouldHaveSameItems(new string[] { currencyNegativePatterns[numberFormats.CurrencyNegativePattern],
                currencyPositivePatterns[numberFormats.CurrencyPositivePattern] });

            currencyFormat["decimals"].ShouldEqual(numberFormats.CurrencyDecimalDigits);
            currencyFormat[","].ShouldEqual(numberFormats.CurrencyGroupSeparator);
            currencyFormat["."].ShouldEqual(numberFormats.CurrencyDecimalSeparator);
            (currencyFormat["groupSize"] as IList).ShouldHaveSameItems(numberFormats.CurrencyGroupSizes);
            currencyFormat["symbol"].ShouldEqual(numberFormats.CurrencySymbol);

            var percentFormat = numberFormat["percent"] as Dictionary<string, object>;

            (percentFormat["pattern"] as IList).ShouldHaveSameItems(new string[] { percentNegativePatterns[numberFormats.PercentNegativePattern],
                percentPositivePatterns[numberFormats.PercentPositivePattern] });

            percentFormat["decimals"].ShouldEqual(numberFormats.PercentDecimalDigits);
            percentFormat[","].ShouldEqual(numberFormats.PercentGroupSeparator);
            percentFormat["."].ShouldEqual(numberFormats.PercentDecimalSeparator);
            (percentFormat["groupSize"] as IList).ShouldHaveSameItems(numberFormats.PercentGroupSizes);
            percentFormat["symbol"].ShouldEqual(numberFormats.PercentSymbol);
        }

        private void VerifyDateTimeFormats(Dictionary<string, object> dateFormat, CultureInfo cultureInfo)
        {
            var dateTimeFormats = cultureInfo.DateTimeFormat;

            var days = dateFormat["days"] as Dictionary<string, object>;

            (days["names"] as IList).ShouldHaveSameItems(dateTimeFormats.DayNames);
            (days["namesAbbr"] as IList).ShouldHaveSameItems(dateTimeFormats.AbbreviatedDayNames);
            (days["namesShort"] as IList).ShouldHaveSameItems(dateTimeFormats.ShortestDayNames);

            var months = dateFormat["months"] as Dictionary<string, object>;

            (months["names"] as IList).ShouldHaveSameItems(dateTimeFormats.MonthNames.Take(12).ToArray());
            (months["namesAbbr"] as IList).ShouldHaveSameItems(dateTimeFormats.AbbreviatedMonthNames.Take(12).ToArray());

            var am = dateTimeFormats.AMDesignator;
            var pm = dateTimeFormats.PMDesignator;

            (dateFormat["AM"] as IList).ShouldHaveSameItems(GetDesignators(am, cultureInfo));
            (dateFormat["PM"] as IList).ShouldHaveSameItems(GetDesignators(pm, cultureInfo));

            var patterns = dateFormat["patterns"] as Dictionary<string, object>;

            patterns["d"] = dateTimeFormats.ShortDatePattern;
            patterns["D"] = dateTimeFormats.LongDatePattern;
            patterns["F"] = dateTimeFormats.FullDateTimePattern;
            patterns["g"] = dateTimeFormats.ShortDatePattern + " " + dateTimeFormats.ShortTimePattern;
            patterns["G"] = dateTimeFormats.ShortDatePattern + " " + dateTimeFormats.LongTimePattern;
            patterns["m"] = dateTimeFormats.MonthDayPattern;
            patterns["M"] = dateTimeFormats.MonthDayPattern;
            patterns["s"] = dateTimeFormats.SortableDateTimePattern;
            patterns["t"] = dateTimeFormats.ShortTimePattern;
            patterns["T"] = dateTimeFormats.LongTimePattern;
            patterns["u"] = dateTimeFormats.UniversalSortableDateTimePattern;
            patterns["y"] = dateTimeFormats.YearMonthPattern;
            patterns["Y"] = dateTimeFormats.YearMonthPattern;

            patterns["/"] = dateTimeFormats.DateSeparator;
            patterns[":"] = dateTimeFormats.TimeSeparator;
            patterns["firstDay"] = (int)dateTimeFormats.FirstDayOfWeek;
        }

        private string[] GetDesignators(string designator, CultureInfo cultureInfo)
        {
            if (string.IsNullOrEmpty(designator))
            {
                return new string[] { designator };
            }
            else
            {
                return new string[] { designator, designator.ToLower(cultureInfo), designator.ToUpper(cultureInfo) };
            }
        }
    }
}

