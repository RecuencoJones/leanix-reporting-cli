import * as chalk from 'chalk';
import { exec } from 'child_process';
import * as rimraf from 'rimraf';
import { promisify } from 'util';

export class Builder {

  public static create(): Builder {
    return new Builder(promisify(rimraf), promisify(exec), console);
  }

  constructor (
    private rimraf: (path: string) => Promise<void>,
    private exec: (command: string) => Promise<{ stdout: string, stderr: string }>,
    private logger: { log(string: string): void, error(string: string): void }
  ) {}

  public async build(distPath: string, buildCommand: string): Promise<void> {
    this.logger.log(chalk.yellow(chalk.italic('Building...')));

    try {
      await this.rimraf(distPath);
      const { stdout } = await this.exec(buildCommand);

      this.logger.log(stdout);
      this.logger.log(chalk.green('\u2713 Project successfully build!'));
    } catch (error) {
      this.logger.error(error);
    }
  }
}
