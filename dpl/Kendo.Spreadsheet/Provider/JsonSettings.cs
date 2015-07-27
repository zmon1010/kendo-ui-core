using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Kendo.Spreadsheet
{
    public class JsonSettings
    {
        public JsonSettings()
        {
            Encoding = System.Text.Encoding.UTF8;
            BufferSize = 4096;
            LeaveOpen = true;
        }

        public Encoding Encoding { get; set; }
        public int BufferSize { get; set; }
        public bool LeaveOpen { get; set; }
    }
}
