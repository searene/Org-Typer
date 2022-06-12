import { Backend } from "../Backend";
import { MockBackend } from "../impl/MockBackend";
import { TauriBackend } from "../impl/TauriBackend";

export class BackendFactory {

    static get(): Backend {
        if (this.isInWeb()) {
            return new MockBackend()
        } else {
            return new TauriBackend()
        }
    }

    private static isInWeb(): boolean {
        return window.__TAURI__ === undefined
    }
}