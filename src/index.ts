import { Command } from 'commander';
import { version, description } from '../package.json';

const program = new Command();

program
  .version(version)
  .description(description)
  .parse(process.argv);
