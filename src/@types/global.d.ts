interface InternalTauri {
    convertFileSrc: (localPath: string) => string
}
interface TauriObject {
    invoke: any
    tauri: InternalTauri
}
interface Window {
    __TAURI__: TauriObject | undefined;
}