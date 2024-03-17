declare function safeJsonStringify(value: unknown): string;
declare function safeJsonStringify(value: unknown, replacer: null | undefined | ((key: string, value: unknown) => unknown)): string;
declare function safeJsonStringify(value: unknown, replacer: null | undefined | ((key: string, value: unknown) => unknown), space: string | number): string;

declare module 'safe-json-stringify' {
    export = safeJsonStringify;

}