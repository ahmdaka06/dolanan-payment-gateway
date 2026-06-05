import { AppConfigService } from '../app-config.service';

export function throttlerConfig(config: AppConfigService) {
  return {
    name: 'default' as const,
    ttl: config.throttleTtl,
    limit: config.throttleLimit,
  };
}
