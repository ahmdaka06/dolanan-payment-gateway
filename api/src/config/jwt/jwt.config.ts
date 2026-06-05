import { JwtModuleOptions, JwtSignOptions } from '@nestjs/jwt';
import { AppConfigService } from '../app-config.service';

export function createJwtOptions(config: AppConfigService): JwtModuleOptions {
  return {
    secret: config.jwtSecret,
    signOptions: {
      expiresIn: config.jwtExpiresIn,
    } as JwtSignOptions,
  };
}
