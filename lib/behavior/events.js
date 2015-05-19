events = {};

events.beforeremove = function(e) {
  // Find a class on which the behavior had been set.
  var behavior = Astro.Utils.findBehavior(this.constructor, 'softremove');

  // If "hasRemovedField" option is set.
  if (behavior.options.hasRemovedField) {
    e.stopPropagation();
    // Set value for created field.
    this.set(behavior.options.removedFieldName, true);
  }
  // If "hasRemovedAtField" option is set.
  if (behavior.options.hasRemovedAtField) {
    // Set value for created field.
    this.set(behavior.options.removedAtFieldName, new Date());
  }
};