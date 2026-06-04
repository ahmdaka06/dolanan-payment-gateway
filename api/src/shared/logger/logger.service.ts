import { Injectable, LoggerService, LogLevel } from '@nestjs/common';

@Injectable()
export class AppLoggerService implements LoggerService {
    private readonly context?: string;

    constructor(context?: string) {
        this.context = context;
    }

    private formatMessage(level: string, message: any, ...optionalParams: any[]) {
        const timestamp = new Date().toISOString();
        const ctx = optionalParams.length > 0 ? optionalParams[0] : this.context;
        const rest = optionalParams.length > 1 ? optionalParams.slice(1) : [];

        let formatted = `[${timestamp}] ${level.toUpperCase()}`;
        if (ctx) formatted += ` [${ctx}]`;
        formatted += `: ${message}`;
        if (rest.length > 0) formatted += ` ${rest.map((r) => JSON.stringify(r)).join(' ')}`;

        return formatted;
    }

    log(message: any, ...optionalParams: any[]) {
        console.log(this.formatMessage('info', message, ...optionalParams));
    }

    error(message: any, ...optionalParams: any[]) {
        console.error(this.formatMessage('error', message, ...optionalParams));
    }

    warn(message: any, ...optionalParams: any[]) {
        console.warn(this.formatMessage('warn', message, ...optionalParams));
    }

    debug(message: any, ...optionalParams: any[]) {
        console.debug(this.formatMessage('debug', message, ...optionalParams));
    }

    verbose(message: any, ...optionalParams: any[]) {
        console.info(this.formatMessage('verbose', message, ...optionalParams));
    }
}
