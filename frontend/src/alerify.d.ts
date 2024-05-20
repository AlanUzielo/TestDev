declare module 'alertifyjs' {
    export function alert(message: string, onOk?: () => void): void;
    export function confirm(message: string, onOk?: () => void, onCancel?: () => void): void;
    export function prompt(message: string, value: string, onOk?: (evt: Event, value: string) => void, onCancel?: () => void): void;
    export function success(message: string): void;
    export function error(message: string): void;
    export function warning(message: string): void;
    export function message(message: string): void;
}
  