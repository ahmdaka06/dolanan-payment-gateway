import { AppConfigService } from '../app-config.service';

export function throttlerConfig(config: AppConfigService) {
  return {
    ttl: config.throttleTtl,
    limit: config.throttleLimit,
  };
}
