using System;
using System.Reflection;
using System.Runtime.CompilerServices;
using System.Runtime.InteropServices;
using System.Security;

#if TRIAL
[assembly: AssemblyTitle("Telerik.Web.Spreadsheet Trial version")]
#else
[assembly: AssemblyTitle("Telerik.Web.Spreadsheet")]
#endif

#if NET40
[assembly: AssemblyVersion("1.0.0.40")]
[assembly: AssemblyFileVersion("1.0.0.40")]
#elif NET45
[assembly: AssemblyVersion("1.0.0.45")]
[assembly: AssemblyFileVersion("1.0.0.45")]
#endif

[assembly: AssemblyDescription("")]
[assembly: AssemblyConfiguration("")]
[assembly: AssemblyCompany("Telerik AD")]
[assembly: AssemblyProduct("Telerik.Web.Spreadsheet")]
[assembly: AssemblyCopyright("Copyright © 2012-2015 Telerik AD. All rights reserved.")]
[assembly: AssemblyTrademark("")]
[assembly: AssemblyCulture("")]
[assembly: ComVisible(false)]
[assembly: CLSCompliant(true)]
[assembly: SecurityRules(SecurityRuleSet.Level1)]
[assembly: AllowPartiallyTrustedCallers]
