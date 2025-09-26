import { Injectable, LoggerService } from '@nestjs/common';

@Injectable()
export class CustomLoggerService implements LoggerService {
  // Aqui precisaria trocar para algum banco ou algo assim, um azure storage ou mongo para salvar esses logs de forma mais persistente e n deixar em console.log

  private context?: string;

  constructor(context?: string) {
    this.context = context;
  }

  log(message: any, context?: string) {
    const timestamp = new Date().toISOString();
    const ctx = context || this.context || 'Application';
    console.log(`[${timestamp}] [LOG] [${ctx}] ${message}`);
  }

  error(message: any, trace?: string, context?: string) {
    const timestamp = new Date().toISOString();
    const ctx = context || this.context || 'Application';
    console.error(`[${timestamp}] [ERROR] [${ctx}] ${message}`);
    if (trace) {
      console.error(`[${timestamp}] [ERROR] [${ctx}] Stack: ${trace}`);
    }
  }

  warn(message: any, context?: string) {
    const timestamp = new Date().toISOString();
    const ctx = context || this.context || 'Application';
    console.warn(`[${timestamp}] [WARN] [${ctx}] ${message}`);
  }

  debug(message: any, context?: string) {
    const timestamp = new Date().toISOString();
    const ctx = context || this.context || 'Application';
    console.debug(`[${timestamp}] [DEBUG] [${ctx}] ${message}`);
  }

  verbose(message: any, context?: string) {
    const timestamp = new Date().toISOString();
    const ctx = context || this.context || 'Application';
    console.log(`[${timestamp}] [VERBOSE] [${ctx}] ${message}`);
  }
}
