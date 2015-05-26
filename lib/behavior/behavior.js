Astronomy.createBehavior({
  name: 'softremove',
  aliases: ['Softremove', 'softremovable'],
  options: {
    hasRemovedField: true,
    removedFieldName: 'removed',
    hasRemovedAtField: true,
    removedAtFieldName: 'removedAt'
  },
  oninitbehavior: function(behaviorData) {
    // Update behavior options with options defined by user in the class schema.
    if (_.has(behaviorData, 'hasRemovedField')) {
      if (!_.isBoolean(behaviorData.hasRemovedField)) {
        throw new Error(
          'The "hasRemovedField" option in the "softremovable" behavior has to ' +
          'be a boolean'
        );
      }

      this.options.hasRemovedField = behaviorData.hasRemovedField;
    }

    if (_.has(behaviorData, 'removedFieldName')) {
      if (!_.isString(behaviorData.removedFieldName)) {
        throw new Error(
          'The "removedFieldName" option in the "softremovable" behavior has to ' +
          'be a string'
        );
      }

      this.options.removedFieldName = behaviorData.removedFieldName;
    }

    if (_.has(behaviorData, 'hasRemovedAtField')) {
      if (!_.isBoolean(behaviorData.hasRemovedAtField)) {
        throw new Error(
          'The "hasRemovedAtField" option in the "softremovable" behavior has to ' +
          'be a boolean'
        );
      }

      this.options.hasRemovedAtField = behaviorData.hasRemovedAtField;
    }

    if (_.has(behaviorData, 'removedAtFieldName')) {
      if (!_.isString(behaviorData.removedAtFieldName)) {
        throw new Error(
          'The "removedAtFieldName" option in the "softremovable" behavior has to ' +
          'be a string'
        );
      }

      this.options.removedAtFieldName = behaviorData.removedAtFieldName;
    }
  },
  oninitclass: function(Class) {
    // Add remvoed field to the class if not disabled.
    if (this.options.hasRemovedField) {

      // Get removed field name (can be overridden by user).
      var removedFieldName = this.options.removedFieldName;

      // Add field of "boolean" type.
      Class.addField(removedFieldName, {
        type: 'boolean',
        default: false
      });

    }

    // Add removedAt field to the class if not disabled.
    if (this.options.hasRemovedAtField) {

      // Get removedAt field name (can be overridden by user).
      var removedAtFieldName = this.options.removedAtFieldName;

      // Add field of "date" type.
      Class.addField(removedAtFieldName, {
        type: 'date',
        default: null
      });

    }
    Class.addMethod("softRemove", methods.softRemove);
  }
});
