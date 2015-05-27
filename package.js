Package.describe({
  summary: 'Softremove behavior for Meteor Astronomy',
  version: '0.0.5',
  name: 'arillo:astronomy-softremove-behavior',
  git: 'https://github.com/arillo/meteor-astronomy-softremove-behavior.git'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.2');

  api.use('jagi:astronomy-behaviors@0.5.2');
  api.use('underscore');

  // Behavior.
  api.addFiles('lib/behavior/methods.js', ['client', 'server']);
  api.addFiles('lib/behavior/behavior.js', ['client', 'server']);
});
