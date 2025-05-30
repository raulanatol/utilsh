import { format } from 'node:util';

export class Logger {
  private static readonly COLORS = {
    reset: '\x1b[0m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    gray: '\x1b[90m'
  };

  private static formatMessage(color: string, icon: string, message: string, ...args: unknown[]): string {
    const formattedMessage = format(message, ...args);
    return `${color}${icon} ${formattedMessage}${this.COLORS.reset}`;
  }

  static error(message: string, ...args: unknown[]): void {
    process.stderr.write(this.formatMessage(this.COLORS.red, '❌ Error:', message, ...args) + '\n');
  }

  static info(message: string, ...args: unknown[]): void {
    process.stdout.write(this.formatMessage(this.COLORS.blue, 'ℹ️ Info:', message, ...args) + '\n');
  }

  static success(message: string, ...args: unknown[]): void {
    process.stdout.write(this.formatMessage(this.COLORS.green, '✅ Success:', message, ...args) + '\n');
  }

  static warning(message: string, ...args: unknown[]): void {
    process.stderr.write(this.formatMessage(this.COLORS.yellow, '⚠️ Warning:', message, ...args) + '\n');
  }

  static debug(message: string, ...args: unknown[]): void {
    if (process.env.NODE_ENV === 'development') {
      process.stdout.write(this.formatMessage(this.COLORS.gray, '🔍 Debug:', message, ...args) + '\n');
    }
  }
}
