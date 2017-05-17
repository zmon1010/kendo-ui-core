namespace Kendo.Mvc.UI.Fluent
{
    using System;

    /// <summary>
    /// Defines the fluent API for configuring the <see cref="ExpandableAnimation"/> object.
    /// </summary>
    public class ExpandableAnimationBuilder
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ExpandableAnimationBuilder" /> class.
        /// </summary>
        /// <param name="animation"></param>
        public ExpandableAnimationBuilder(ExpandableAnimation animation)
        {
            Animation = animation;
        }

        protected ExpandableAnimation Animation
        {
            get;
            private set;
        }

        /// <summary>
        /// Enables or disables the animation.
        /// </summary>
        /// <param name="enable">Specifies whether the animation is enabled.</param>
        public void Enable(bool enable)
        {
            Animation.Enabled = enable;
        }

        /// <summary>
        /// The Expand settings.
        /// </summary>
        /// <param name="effectsAction">The configuration action.</param>
        public ExpandableAnimationBuilder Expand(Action<EffectsBuilder> effectsAction)
        {
            effectsAction(new EffectsBuilder(Animation.Expand));

            return this;
        }

        /// <summary>
        /// The Collapse settings.
        /// </summary>
        /// <param name="effectsAction">The configuration action.</param>
        public ExpandableAnimationBuilder Collapse(Action<EffectsBuilder> effectsAction)
        {
            effectsAction(new EffectsBuilder(Animation.Collapse));

            return this;
        }
    }
}
