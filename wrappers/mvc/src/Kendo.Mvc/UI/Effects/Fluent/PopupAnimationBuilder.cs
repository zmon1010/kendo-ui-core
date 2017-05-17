namespace Kendo.Mvc.UI.Fluent
{
    using System;

    /// <summary>
    /// Defines the fluent API for configuring the <see cref="PopupAnimation"/> object.
    /// </summary>
    public class PopupAnimationBuilder
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="PopupAnimationBuilder" /> class.
        /// </summary>
        /// <param name="animation"></param>
        public PopupAnimationBuilder(PopupAnimation animation)
        {
            Animation = animation;
        }

        protected PopupAnimation Animation
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
        /// The Open settings.
        /// </summary>
        /// <param name="effectsAction">The configuration action.</param>
        public PopupAnimationBuilder Open(Action<EffectsBuilder> effectsAction)
        {
            effectsAction(new EffectsBuilder(Animation.Open));

            return this;
        }

        /// <summary>
        /// The Close settings.
        /// </summary>
        /// <param name="effectsAction">The configuration action.</param>
        public PopupAnimationBuilder Close(Action<EffectsBuilder> effectsAction)
        {
            effectsAction(new EffectsBuilder(Animation.Close));

            return this;
        }
    }
}
