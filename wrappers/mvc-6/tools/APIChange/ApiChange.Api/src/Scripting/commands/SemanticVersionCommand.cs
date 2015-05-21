using System.Collections.Generic;
using ApiChange.Infrastructure;

namespace ApiChange.Api.Scripting
{
    internal class SemanticVersionCommand : CommandBase
    {
        #region ICommandeLineAction Members

        public SemanticVersionCommand(CommandData cmdArgs)
            : base(cmdArgs)
        {
        }

        protected override void Validate()
        {
            base.Validate();

            ValidateFileQuery(myParsedArgs.NewFiles,
                "-new <filequery> is missing.",
                "Invalid directory in -new {0} query.",
                "The -new query {0} did not match any files.");

            ValidateFileQuery(myParsedArgs.OldFiles,
                "-old <filequery> is missing.",
                "Not existing directory in -old {0} query.",
                "The -old query {0} did not match any files.");
        }

        public override void Execute()
        {
            base.Execute();
            if (!IsValid)
            {
                Help();
                return;
            }

            List<FileQuery> oldFileQueries = myParsedArgs.Queries1;
            List<FileQuery> newFileQueries = myParsedArgs.Queries2;

            var semanticVersioner = new SemanticVersioner(oldFileQueries, newFileQueries, myParsedArgs.StrongNameKeyPath);
            semanticVersioner.Execute(Out);
        }

        #endregion
    }
}