using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KendoScaffolder.UI.Models
{
    public enum ChartConfiguration
    {
        Value,

        Lower, Q1, Median, Q3, Upper, Mean, Outliers,

        X, Y, Size,

        Current, Target,

        Open, High, Low, Close,

        From, To,

        Name, Color, Category, Summary
    }
}
