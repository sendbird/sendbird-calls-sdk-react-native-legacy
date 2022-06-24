declare const LogLevelEnum: {
    none: number;
    log: number;
    error: number;
    warn: number;
    info: number;
    debug: number;
};
declare type LogLevel = keyof typeof LogLevelEnum;
/** @internal **/
export declare const getLogger: (lv?: LogLevel, title?: string | undefined) => {
    setTitle(title: string): void;
    setLogLevel(lv: LogLevel): void;
    getLogLevel(): "none" | "log" | "error" | "warn" | "info" | "debug";
    log(...args: unknown[]): number;
    error(...args: unknown[]): number;
    warn(...args: unknown[]): number;
    info(...args: unknown[]): number;
    debug(...args: unknown[]): number;
};
export declare const Logger: {
    setTitle(title: string): void;
    setLogLevel(lv: LogLevel): void;
    getLogLevel(): "none" | "log" | "error" | "warn" | "info" | "debug";
    log(...args: unknown[]): number;
    error(...args: unknown[]): number;
    warn(...args: unknown[]): number;
    info(...args: unknown[]): number;
    debug(...args: unknown[]): number;
};
export {};
