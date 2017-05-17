namespace Kendo.Mvc.UI.Fluent
{
    using System;

    /// <summary>
    /// Defines the fluent API for configuring the <see cref="PopupCollision"/> object.
    /// </summary>
    public class PopupCollisionBuilder
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="PopupCollisionBuilder" /> class.
        /// </summary>
        /// <param name="animation"></param>
        public PopupCollisionBuilder(PopupCollision popupCollision)
        {
            PopupCollision = popupCollision;
        }

        protected PopupCollision PopupCollision
        {
            get;
            private set;
        }

        /// <summary>
        /// Enables or disables the collision.
        /// </summary>
        /// <param name="enable">Specifies whether the collision is enabled.</param>
        public void Enable(bool enable)
        {
            PopupCollision.Enabled = enable;
        }

        /// <summary>
        /// Defines the collision.
        /// </summary>
        /// <param name="collision">The collision.</param>
        public PopupCollisionBuilder Collision(string collision)
        {
            PopupCollision.Collision = collision;

            return this;
        }
    }
}
