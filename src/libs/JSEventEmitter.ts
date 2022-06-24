import { Logger } from '../utils/logger';

type Listener = (...args: unknown[]) => void;
type ListenerPool = Record<number, Listener>;

let val = 0;
function createUniqueKey() {
  return val++;
}

export default class JSEventEmitter {
  private eventPool: Record<string, ListenerPool> = {};
  private getListenerPool(event: string) {
    if (!this.eventPool[event]) this.eventPool[event] = {};
    return this.eventPool[event];
  }

  addListener(event: string, listener: Listener) {
    const uniqKey = createUniqueKey();
    const listenerPool = this.getListenerPool(event);

    listenerPool[uniqKey] = listener;

    return () => {
      delete listenerPool[uniqKey];
    };
  }

  emit(event: string, ...args: unknown[]) {
    setTimeout(() => {
      const listenerPool = this.getListenerPool(event);
      const listeners = Object.values<Listener>(listenerPool);
      listeners.forEach((listener) => {
        try {
          listener(...args);
        } catch (e) {
          Logger.warn('[JSEventEmitter]', e);
        }
      });
    }, 0);
  }
}
