#!/usr/bin/env npx ts-node --esm

import { Command } from 'commander';
import { version, description } from '../package.json';
import Generator from './generator';

const program = new Command();

program.
  version(version).
  description(description)

program.
  argument('<path>', 'Path to directory of file that should be used for generating ngrams').
  option('-d, --debug', 'Output debug information').
  option('-f, --file <path>', 'Output file path, if not provided output will be written into STDOUT').
  option('-l, --length <number>', 'Length of generated ngrams', '3')

program.parse(process.argv);

const options = program.opts();

const generator = new Generator(program.args[0], parseInt(options.length), options.debug, options.file)
generator.run()
