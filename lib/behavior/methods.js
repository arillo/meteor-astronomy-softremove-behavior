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
  Astro.eventManager.emit('beforesoftremove', new Astro.EventData(null), this);

  // We do a normal save since we use the events for updating the proper attributes
  var result = this.save();

  // Trigger "aftersoftremove" event handlers on the current and parent classes.
  Astro.eventManager.emit('aftersoftremove', new Astro.EventData(null), this);

  // Return result of removing document.
  return result;
};