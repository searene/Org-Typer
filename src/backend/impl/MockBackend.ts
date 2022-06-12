import { Backend } from "../Backend";

export class MockBackend implements Backend {

    convertLocalSrc(localFilePath: string): string {
        throw new Error("Method not implemented.");
    }

    chooseImageFile(): Promise<string | undefined> {
        return Promise.resolve("/Users/joey/Pictures/sky.jpeg");
    }

}