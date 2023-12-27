#!/usr/bin/env node

import { Command } from 'commander';
import { version, description } from '../package.json';
import { Generator } from './generator';
import Output from './output';

const program = new Command();

program.
  version(version).
  description(description)

program.
  argument('<path>', 'Path to directory of file that should be used for generating ngrams').
  option('-d, --debug', 'Output debug information').
  option('-f, --file <path>', 'Output file path, if not provided output will be written into STDOUT').
  option('-l, --length <number>', 'Length of generated ngrams', '3').
  option('-t, --top <number>', 'Number of top ngrams that should be generated', '50')

program.parse(process.argv);

const options = program.opts();
const output = new Output(options.file);

const generator = new Generator(program.args[0],
  parseInt(options.length),
  parseInt(options.top),
  options.debug,
  output,
  options.file,
)

generator.run().catch((error) => {
  console.error(error);
  process.exit(1);
});
