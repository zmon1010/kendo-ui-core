using System;
using System.Collections.Generic;
using Kendo.Mvc.Extensions;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring EditorSerializationSettings
    /// </summary>
    public partial class EditorSerializationSettingsBuilder
        
    {
        /// <summary>
        /// Indicates whether the characters outside the ASCII range will be encoded as HTML entities. By default, they are encoded.
        /// </summary>
        /// <param name="value">The value for Entities</param>
        public EditorSerializationSettingsBuilder Entities(bool value)
        {
            Container.Entities = value;
            return this;
        }

        /// <summary>
        /// Indicates whether inline scripts will be serialized and posted to the server.
        /// </summary>
        /// <param name="value">The value for Scripts</param>
        public EditorSerializationSettingsBuilder Scripts(bool value)
        {
            Container.Scripts = value;
            return this;
        }

        /// <summary>
        /// Indicates whether inline scripts will be serialized and posted to the server.
        /// </summary>
        public EditorSerializationSettingsBuilder Scripts()
        {
            Container.Scripts = true;
            return this;
        }

        /// <summary>
        /// Indicates whether the font styles will be saved as semantic (strong / em / span) tags,
		/// or as presentational (b / i / u / font) tags. Used for outputting content for legacy systems.
        /// </summary>
        /// <param name="value">The value for Semantic</param>
        public EditorSerializationSettingsBuilder Semantic(bool value)
        {
            Container.Semantic = value;
            return this;
        }

    }
}
