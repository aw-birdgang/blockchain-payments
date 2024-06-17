import * as dotenv from 'dotenv';
import { Logger } from '@nestjs/common';

export class ConfigService {
  private readonly envConfig: { [key: string]: string };
  private readonly logger = new Logger(ConfigService.name);

  constructor() {
    const envMapping: { [key: string]: string } = {
      prod: '.env.prod',
      dev: '.env.dev',
    };

    const envFile = envMapping[process.env.NODE_ENV] || '.env';

    this.logger.log(`Loading environment variables from ${envFile} for environment: ${process.env.NODE_ENV || 'default'}`);

    dotenv.config({ path: envFile });

    this.envConfig = process.env;
  }

  get(key: string): string {
    return this.envConfig[key];
  }

  isEnv(env: string): boolean {
    return this.nodeEnv === env;
  }

  get nodeEnv(): string {
    return process.env.NODE_ENV || 'dev';
  }
}
