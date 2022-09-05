declare const LogLevelEnum: {
    none: number;
    error: number;
    warning: number;
    info: number;
};
declare type LogLevel = keyof typeof LogLevelEnum;
/** @internal **/
export declare const getLogger: (lv?: LogLevel, title?: string | undefined) => {
    setTitle(title: string): void;
    setLogLevel(lv: LogLevel): void;
    getLogLevel(): "none" | "error" | "warning" | "info";
    error(...args: unknown[]): number;
    warn(...args: unknown[]): number;
    info(...args: unknown[]): number;
};
export declare const Logger: {
    setTitle(title: string): void;
    setLogLevel(lv: LogLevel): void;
    getLogLevel(): "none" | "error" | "warning" | "info";
    error(...args: unknown[]): number;
    warn(...args: unknown[]): number;
    info(...args: unknown[]): number;
};
export {};
