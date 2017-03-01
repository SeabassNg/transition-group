module.exports = (wallaby) => {
  // Babel, jest-cli and some other modules are located under
  // react-scripts/node_modules, so need to let node.js know about it
  const path = require('path')

  process.env.NODE_PATH += `${path.delimiter}${path.join(wallaby.localProjectDir, 'client-site', 'node_modules')}${path.delimiter}${path.join(wallaby.localProjectDir, 'server', 'node_modules')}`


  require('module').Module._initPaths()

  // Babel needs this
  process.env.NODE_ENV = 'test'

  return {
    files: [
      { pattern: 'src/**/*.js', load: false },
      { pattern: 'package.json', load: false },
      { pattern: 'stories/**/*.snap', load: false },
      { pattern: 'storybook/**/*.js', load: false },
      { pattern: 'storybook/**/*.css', load: false, instrument: false },
    ],

    filesWithNoCoverageCalculated: [
      'storybook/**/*.js',
    ],

    tests: ['stories/**/*.js'],

    env: {
      type: 'node',
      runner: 'node',
    },

    testFramework: 'jest',
    compilers: {
      '**/*.js': wallaby.compilers.babel({ babelrc: true, presets: ['babel-preset-jest'] }),
    },
    setup(wallaby) {
      const conf = require('./package.json').jest

      conf.setupTestFrameworkScriptFile = conf.setupTestFrameworkScriptFile.replace('<rootDir>', wallaby.projectCacheDir)

      wallaby.testFramework.configure(conf)
    },
    // runAllTestsInAffectedTestFile: true,
    // runAllTestsInAffectedTestGroup: true,
    debug: true,
  }
}
