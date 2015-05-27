var checks = {};

checks.behaviorData = function(behaviorData) {
  if (!_.isBoolean(behaviorData.hasRemovedField)) {
    throw new Error(
      'The "hasRemovedField" option in the "softremovable" behavior has to ' +
      'be a boolean'
    );
  }

  if (!_.isString(behaviorData.removedFieldName)) {
    throw new Error(
      'The "removedFieldName" option in the "softremovable" behavior has to ' +
      'be a string'
    );
  }

  if (!_.isBoolean(behaviorData.hasRemovedAtField)) {
    throw new Error(
      'The "hasRemovedAtField" option in the "softremovable" behavior has to ' +
      'be a boolean'
    );
  }

  if (!_.isString(behaviorData.removedAtFieldName)) {
    throw new Error(
      'The "removedAtFieldName" option in the "softremovable" behavior has to ' +
      'be a string'
    );
  }
};

Astronomy.createBehavior({
  name: 'softremove',
  aliases: ['Softremove', 'softremovable'],
  options: {
    hasRemovedField: true,
    removedFieldName: 'removed',
    hasRemovedAtField: true,
    removedAtFieldName: 'removedAt'
  },
  events: {
    addbehavior: function(behaviorData) {

      var Class = this;
      var behavior = Astro.behaviors.softremove;

      // Set default behavior's options if they were not provided in the schema.
      if (_.isUndefined(behaviorData.hasRemovedField)) {
        behaviorData.hasRemovedField = behavior.options.hasRemovedField;
      }
      if (_.isUndefined(behaviorData.removedFieldName)) {
        behaviorData.removedFieldName = behavior.options.removedFieldName;
      }
      if (_.isUndefined(behaviorData.hasRemovedAtField)) {
        behaviorData.hasRemovedAtField = behavior.options.hasRemovedAtField;
      }
      if (_.isUndefined(behaviorData.removedAtFieldName)) {
        behaviorData.removedAtFieldName = behavior.options.removedAtFieldName;
      }

      // Check validity of options.
      checks.behaviorData.call(Class, behaviorData);

      // Add removed field to the class if not disabled.
      if (behaviorData.hasRemovedField) {
        // Get removed field name (can be overridden by user).
        var removedFieldName = behaviorData.removedFieldName;

        // Add field of "boolean" type.
        Class.addField(removedFieldName, {
          type: 'boolean',
          default: false
        });
      }

      // Add removedAt field to the class if not disabled.
      if (behaviorData.hasRemovedAtField) {
        // Get removedAt field name (can be overridden by user).
        var removedAtFieldName = behaviorData.removedAtFieldName;

        // Add field of "date" type.
        Class.addField(removedAtFieldName, {
          type: 'date',
          default: null
        });
      }

      // Add softRemove method
      Class.addMethod("softRemove", methods.softRemove);
      
    }
  }
});
