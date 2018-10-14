#!/usr/bin/env node

const commander = require('commander');
const updateNotifier = require('update-notifier');
const cliPkg = require('../package.json');
const pkg = require('../package.json');

updateNotifier({ pkg, updateCheckInterval: 0 }).notify();

commander
  .version(cliPkg.version)
  .command('start', 'Start Expo cool storybook server')
  .parse(process.argv);
