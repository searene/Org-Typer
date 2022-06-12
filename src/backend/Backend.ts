export interface Backend {

    /**
     * Choose an image file and return its absolute path.
     */
    chooseImageFile(): Promise<string | undefined>;
}