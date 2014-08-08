
var scm = {
      'git': require('strider-git/worker'),
      'hg': require('strider-hg/worker')
    } 
module.exports = {
  init: function (dirs, account, config, job, done) {
    return done(null, {
      config: config,
      account: account,
      fetch: function (context, done) {
        module.exports.fetch(dirs.data, account, config, job, context, done)
      }
    })
  },
  fetch: function (dest, account, config, job, context, done) {
    if (config.scm !== 'git' && config.scm !== 'hg') {
      return done(new Error('Bitbucket repo is not git or mercurial... '))
    }
    if (config.auth.type === 'https' && !config.auth.username) {
      config.auth.username = account.accessToken
      config.auth.password = ''
    }
    scm[config.scm].fetch(dest, config, job, context, done)
  }
}
