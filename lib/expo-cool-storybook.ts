#!/usr/bin/env node

import { parse, version } from 'commander';
import 'es6-shim';
import 'reflect-metadata';
import { WebsocketServer } from './server';
version('0.1.0')
  .command('start [options...]')
  .option('-p, --port <n>', 'An integer argument', parseInt)
  .action((env, options: { port: number }) => {
    // tslint:disable-next-line:no-commented-code
    // start(options.port);
    WebsocketServer.start(options.port);
  });

parse(process.argv);
