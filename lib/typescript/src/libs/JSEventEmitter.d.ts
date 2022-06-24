declare type Listener = (...args: unknown[]) => void;
export default class JSEventEmitter {
    private eventPool;
    private getListenerPool;
    addListener(event: string, listener: Listener): () => void;
    emit(event: string, ...args: unknown[]): void;
}
export {};
