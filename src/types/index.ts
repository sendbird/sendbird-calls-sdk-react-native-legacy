/* eslint-disable @typescript-eslint/no-explicit-any */
import { ControllableModuleType } from './NativeModule';

/** @internal **/
type PlatformPrefix = 'android' | 'ios';

/** @internal **/
export type AsNativeInterface<T> = T extends
  | boolean
  | number
  | string
  | null
  | undefined
  | ((...p: any[]) => any)
  | unknown[]
  ? T
  : {
      [key in keyof T as key extends `${PlatformPrefix}_${infer Rest}` ? Rest : key]: AsNativeInterface<T[key]>;
      // T[key] extends
      //     | Enumerations
      //     | Array<Enumerations>
      //     ? T[key]
      //     : AsNativeInterface<T[key]>;
    };

/** @internal **/
export type Values<T extends { [key: string]: any }> = T[keyof T];

/** @internal **/
export type AsJSInterface<T, Platform extends PlatformPrefix, Keys extends keyof T> = {
  // @ts-ignore
  [key in keyof T as key extends Keys ? `${Platform}_${key}` : key]: T[key];
};

/** @internal **/
export type AsJSMediaDeviceControl<T> = {
  [key in keyof T]: T[key] extends (type: ControllableModuleType, identifier: string, ...args: infer Args) => infer R
    ? (...args: Args) => R
    : T[key];
};

/** @internal **/
export type AsJSDirectCall<T> = {
  [key in keyof T]: T[key] extends (callId: string, ...args: infer Args) => infer R ? (...args: Args) => R : T[key];
};

/** @internal **/
export type AsJSGroupCall<T> = {
  [key in keyof T]: T[key] extends (roomId: string, ...args: infer Args) => infer R ? (...args: Args) => R : T[key];
};

export * from './Call';
export * from './Media';
export * from './NativeModule';
export * from './Platform';
export * from './User';
export * from './Room';
export * from './Participant';
export * from './Query';
