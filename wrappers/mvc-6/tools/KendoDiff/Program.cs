using Mono.Cecil;
using Mono.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace KendoDiff
{
    class Program
    {
        static void Main(string[] args)
        {
            bool showHelp = false;
            string typeNameIn = "";
            Regex typeName = null;

            // See http://docs.go-mono.com/?link=T%3aMono.Options.OptionSet
            var options = new OptionSet() {
                "Usage: kendodiff [OPTIONS]+ assembly",
                "Dumps assembly type members",
                "",
                "Options:",
                { "t|type=",
                    "the type name (regex)",
                  val => typeNameIn = val },
                { "h|help",  "show this message and exit",
                  val => showHelp = val != null },
            };

            List<string> assemblies;
            try
            {
                assemblies = options.Parse(args);
                typeName = new Regex(typeNameIn, RegexOptions.IgnoreCase);
            }
            catch (OptionException e)
            {
                Console.Write("kendodiff: ");
                Console.WriteLine(e.Message);
                Console.WriteLine("Try `kendodiff --help' for more information.");
                return;
            }

            if (showHelp)
            {
                options.WriteOptionDescriptions(Console.Out);
                return;
            }

            if (assemblies.Count > 0)
            {
                Diff(assemblies.First(), typeName);
            }
            else
            {
                Console.Write("kendodiff: ");
                Console.WriteLine("No assembly specified");
                Console.WriteLine("Try `kendodiff --help' for more information.");
                return;
            }
        }

        private static void Diff(string assembly, Regex typeName)
        {
            ModuleDefinition module = ModuleDefinition.ReadModule(assembly);
            
            foreach (var type in module.Types.Where(t => typeName.IsMatch(t.FullName)))
            {
                DumpType(type);
            }
        }

        private static void DumpType(TypeDefinition type)
        {
            foreach (var method in type.Methods)
            {
                Console.WriteLine(method);
            }            
        }
    }
}
