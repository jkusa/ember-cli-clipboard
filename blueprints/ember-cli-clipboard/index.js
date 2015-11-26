module.exports = {
  description: 'install ember-cli-clipboard into a typical project',

  normalizeEntityName: function() {},

  afterInstall: function (options) {
    return this.addBowerPackageToProject('clipboard', '~1.5.5');
  }
};
