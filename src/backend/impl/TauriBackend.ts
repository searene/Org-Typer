import { Backend } from "../Backend";
import { open } from "@tauri-apps/api/dialog"

export class TauriBackend implements Backend {

    async chooseImageFile(): Promise<string | undefined> {
        const imgFilePath = await open({
            "title": "Choose an image file",
            "filters": [{
                "name": "Image Files",
                "extensions": ["jpg", "jpeg", "png", "gif", "svg", "webp", "bmp"]
            }],
            "multiple": false,
            "directory": false,
        })
        if (imgFilePath === null) {
            return undefined
        }
        if (Array.isArray(imgFilePath)) {
            return imgFilePath[0]
        }
        return imgFilePath
        // return await tauriInvoke('choose_img_file')
    }

    convertLocalSrc(localFilePath: string): string {
        return window.__TAURI__!.tauri.convertFileSrc(localFilePath)
    }

}