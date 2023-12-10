// Output strategy for the CLI
// ----------------------------------------------------------------------------
//
// Currently, the CLI supports two output strategies:
// - stdout: the output is written to the standard output
// - file: the output is written to a file

import { writeFileSync } from 'fs';

interface OutputStrategy {
  write(content: string): void;
}

class StdoutStrategy implements OutputStrategy {
  write(content: string): void {
    process.stdout.write(content);
  }
}

class FileStrategy implements OutputStrategy {
  constructor(private readonly filePath: string) {}

  write(content: string): void {
    writeFileSync(this.filePath, content, { flag: 'a' });
  }
}

export class Output {
  private readonly strategy: OutputStrategy;

  constructor(filePath?: string) {
    if (filePath) {
      this.strategy = new FileStrategy(filePath);
    } else {
      this.strategy = new StdoutStrategy();
    }
  }

  write(content: string): void {
    this.strategy.write(content);
  }
}

// const output = new Output('test.txt');
// output.write('Hello world!');
// output.write("Hello world! \n");
