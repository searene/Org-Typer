interface TauriInvoke {
    invoke: any
}
interface Window {
    __TAURI__: TauriInvoke | undefined;
}