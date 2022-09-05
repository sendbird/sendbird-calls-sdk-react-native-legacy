import { Platform } from 'react-native';

const LogLevelEnum = {
  'none': 0,
  'error': 1,
  'warning': 2,
  'info': 3,
};

type LogLevel = keyof typeof LogLevelEnum;

/** @internal **/
export const getLogger = (lv: LogLevel = 'none', title?: string) => {
  let _logLevel = __DEV__ ? lv : 'none';
  let _title = title ?? `[Calls_${Platform.OS}]`;

  return {
    setTitle(title: string) {
      _title = title;
    },
    setLogLevel(lv: LogLevel) {
      if (__DEV__) _logLevel = lv;
    },
    getLogLevel() {
      return _logLevel;
    },
    error(...args: unknown[]) {
      if (LogLevelEnum[_logLevel] < LogLevelEnum.error) return LogLevelEnum.none;
      console.error(_title, ...args);
      return LogLevelEnum[_logLevel];
    },
    warn(...args: unknown[]) {
      if (LogLevelEnum[_logLevel] < LogLevelEnum.warning) return LogLevelEnum.none;
      console.warn(_title, ...args);
      return LogLevelEnum[_logLevel];
    },
    info(...args: unknown[]) {
      if (LogLevelEnum[_logLevel] < LogLevelEnum.info) return LogLevelEnum.none;
      console.info(_title, ...args);
      return LogLevelEnum[_logLevel];
    },
  };
};

export const Logger = getLogger();
