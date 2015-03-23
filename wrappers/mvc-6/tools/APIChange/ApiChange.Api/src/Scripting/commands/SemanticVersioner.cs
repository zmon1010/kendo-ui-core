using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using ApiChange.Api.Introspection;
using ApiChange.Infrastructure;
using Mono.Cecil;

namespace ApiChange.Api.Scripting
{
    public class SemanticVersioner
    {
        private static readonly TypeHashes myType = new TypeHashes(typeof (SemanticVersioner));
        private readonly List<FileQuery> myNewFileQueries;
        private readonly List<FileQuery> myOldFileQueries;
        private readonly string myStrongNameKeyPath;

        public SemanticVersioner(List<FileQuery> oldFileQueries, List<FileQuery> newFileQueries,
            string strongNameKeyPath)
        {
            myOldFileQueries = oldFileQueries;
            myStrongNameKeyPath = strongNameKeyPath;
            myNewFileQueries = newFileQueries;
        }

        /// <returns>Compatibility of produced dll set assuming the previous version was also processed by this command</returns>
        public Compatibility Execute(TextWriter output)
        {
            try
            {
                using (var t = new Tracer(myType, "Execute"))
                {
                    output.WriteLine("Compare old {0} against new {1}", myOldFileQueries.GetSearchDirs(),
                        myNewFileQueries.GetSearchDirs());

                    var newFilenames = myNewFileQueries.GetFiles().Where(filename => NotXmlSerializer(t, filename));
                    var comparableAssemblies = newFilenames.Select(GetComparableAssemblyData).ToList();

                    var updateTasks = comparableAssemblies.Select(AssemblyUpdateTask).ToList();

                    var versionMappings = comparableAssemblies
                        .Where(assemblyPair => assemblyPair.OldExists)
                        .ToDictionary(x => x.New.Name.Name, GetNewVersions);

                    output.WriteLine("Modifying assemblies in memory...");
                    updateTasks.ForEach(x => x.UpdateWithVersions(versionMappings, output));

                    output.WriteLine("Writing changes to disk...");
                    updateTasks.ForEach(x => x.FlushChanges());

                    var packageCompatibility = versionMappings.Values.Select(vers => vers.Compatibility).Min();
                    output.WriteLine("Completed - public interface of new files is {0}", packageCompatibility);

                    return packageCompatibility;
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e.StackTrace);
                throw;
            }
        }

        private static bool NotXmlSerializer(Tracer t, string newFilename)
        {
            if (newFilename.EndsWith(".XmlSerializers.dll", StringComparison.OrdinalIgnoreCase))
            {
                t.Info("Ignore xml serializer dll {0}", newFilename);
                return false;
            }
            return true;
        }

        private ComparableAssemblyData GetComparableAssemblyData(string newFilename)
        {
            var @new = LoadCecilAssembly(newFilename);
            var oldFilename = myOldFileQueries.GetMatchingFileByName(newFilename);
            var old = oldFilename.IsNotNull(() => LoadCecilAssembly(oldFilename));
            var oldFileVersion = oldFilename.IsNotNull(() => GetFileVersion(oldFilename));

            return new ComparableAssemblyData(@new, newFilename, old, oldFileVersion);
        }

        private static AssemblyDefinition LoadCecilAssembly(string filename)
        {
                return AssemblyLoader.LoadCecilAssembly(filename, true);
        }

        private Version GetFileVersion(string filePath)
        {
            return new Version(FileVersionInfo.GetVersionInfo(filePath).FileVersion);
        }

        private AssemblyUpdateTask AssemblyUpdateTask(ComparableAssemblyData assemblyData)
        {
            var assemblyVersionUpdater = new AssemblyVersionUpdater(assemblyData.New);
            return new AssemblyUpdateTask(assemblyData.New.Name.Name, assemblyVersionUpdater, assemblyData.NewFilename, myStrongNameKeyPath);
        }

        private Versions GetNewVersions(ComparableAssemblyData assemblyPair)
        {
            var publicApiDiff = new PublicApiDiff(new AssemblyDiffer(assemblyPair.Old, assemblyPair.New));
            return new Versions(assemblyPair.OldFileVersion, publicApiDiff.ApiCompatibility);
        }

    }
}