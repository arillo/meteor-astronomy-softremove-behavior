methods = {};

methods.softRemove = function(callback) {
  // Get collection for given class or parent class.
  var Collection = this.constructor.getCollection();
  if (!Collection) {
    throw new Error('There is no collection to remove from');
  }

  // Remove only when document has _id, so it's saved in the collection.
  if (!this._values._id) {
    return;
  }

  // Trigger "beforesoftremove" event handlers on the current and parent classes.
  var beforeevent = new Astro.Event('beforesoftremove', this);
  beforeevent.target = this;
  Astro.eventManager.emit(beforeevent);

  // Find a class on which the behavior had been set.
  var behavior = Astro.utils.findBehavior(this.constructor, 'softremove');

  // If "hasRemovedField" option is set.
  if (behavior.hasRemovedField) {
    // Set value for created field.
    this.set(behavior.removedFieldName, true);
  }
  // If "hasRemovedAtField" option is set.
  if (behavior.hasRemovedAtField) {
    // Set value for created field.
    this.set(behavior.removedAtFieldName, new Date());
  }

  // We do a normal save since we use the events for updating the proper attributes
  var result = this.save();

  // Trigger "aftersoftremove" event handlers on the current and parent classes.
  var afterevent = new Astro.Event('aftersoftremove', this);
  afterevent.target = this;
  Astro.eventManager.emit(afterevent);

  // Return result of removing document.
  return result;
};