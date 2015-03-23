
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ApiChange.Api.Scripting
{
    class NoneCommand : CommandBase
    {
        #region ICommandeLineAction Members

        public NoneCommand(CommandData parsedArgs)
            : base(parsedArgs)
        {
        }

        public override void Execute()
        {
            base.Execute();
            Help();
        }

        #endregion
    }
}
