import { Backend } from "../Backend";

export class MockBackend implements Backend {

    chooseImageFile(): Promise<string | undefined> {
        return Promise.resolve("/Users/joey/Pictures/sky.jpeg");
    }

}