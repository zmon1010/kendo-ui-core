using EnvDTE;
using Microsoft.AspNet.Scaffolding;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KendoScaffolder.Scaffolders
{
    public class KendoScaffolderUtils
    {
        private static readonly string PathSeparator = Path.DirectorySeparatorChar.ToString();

        public static string GetTypeVariable(string typeName)
        {
            return typeName.Substring(0, 1).ToLower() + typeName.Substring(1, typeName.Length - 1);
        }

        public static string GetAreaName(string relativePath)
        {
            string[] dirs = relativePath.Split(new char[1] { '\\' });
            return dirs[0].Equals("Areas") ? dirs[1] : String.Empty;
        }

        public static string GetSelectionRelativePath(CodeGenerationContext context)
        {
            return context.ActiveProjectItem == null ? String.Empty : GetProjectRelativePath(context.ActiveProjectItem);
        }

        private static string GetProjectRelativePath(ProjectItem projectItem)
        {
            Project project = projectItem.ContainingProject;
            string projRelativePath = null;

            string rootProjectDir = project.GetFullPath();
            rootProjectDir = EnsureTrailingBackSlash(rootProjectDir);
            string fullPath = projectItem.GetFullPath();

            if (!String.IsNullOrEmpty(rootProjectDir) && !String.IsNullOrEmpty(fullPath))
            {
                projRelativePath = MakeRelativePath(fullPath, rootProjectDir);
            }

            return projRelativePath;
        }

        private static string EnsureTrailingBackSlash(string path)
        {
            if (path != null && !path.EndsWith(PathSeparator, StringComparison.Ordinal))
            {
                path += PathSeparator;
            }
            return path;
        }

        private static string MakeRelativePath(string fullPath, string basePath)
        {
            string tempBasePath = basePath;
            string tempFullPath = fullPath;
            StringBuilder relativePath = new StringBuilder();

            if (!tempBasePath.EndsWith(PathSeparator, StringComparison.OrdinalIgnoreCase))
            {
                tempBasePath += PathSeparator;
            }

            while (!String.IsNullOrEmpty(tempBasePath))
            {
                if (tempFullPath.StartsWith(tempBasePath, StringComparison.OrdinalIgnoreCase))
                {
                    relativePath.Append(fullPath.Remove(0, tempBasePath.Length));
                    if (String.Equals(relativePath.ToString(), PathSeparator, StringComparison.OrdinalIgnoreCase))
                    {
                        relativePath.Clear();
                    }
                    return relativePath.ToString();
                }
                else
                {
                    tempBasePath = tempBasePath.Remove(tempBasePath.Length - 1);
                    int lastIndex = tempBasePath.LastIndexOf(PathSeparator, StringComparison.OrdinalIgnoreCase);
                    if (-1 != lastIndex)
                    {
                        tempBasePath = tempBasePath.Remove(lastIndex + 1);
                        relativePath.Append("..");
                        relativePath.Append(PathSeparator);
                    }
                    else
                    {
                        return fullPath;
                    }
                }
            }

            return fullPath;
        }

        public static string GetDefaultNamespace(CodeGenerationContext context)
        {
            return context.ActiveProjectItem == null
                ? context.ActiveProject.GetDefaultNamespace()
                : context.ActiveProjectItem.GetDefaultNamespace();
        }

        public static ICodeTypeService GetService<T1>(CodeGenerationContext context)
        {
            return (ICodeTypeService)context.ServiceProvider.GetService(typeof(ICodeTypeService));
        }
    }
}
