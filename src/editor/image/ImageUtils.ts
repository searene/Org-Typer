import { Editor, Range, Transforms } from "slate";
import { BackendFactory } from "../../backend/factory/BackendFactory";


export class ImageUtils {
    static async insertImage(editor: Editor): Promise<void> {
        const backend = BackendFactory.get()
        const imgFile = await backend.chooseImageFile()
        if (imgFile === undefined) {
            return;
        }
        const { selection } = editor
        if (!selection || !Range.isCollapsed(selection)) {
            return;
        }
        const [pos] = Range.edges(selection)
        Transforms.insertNodes(editor, [{
            type: "image",
            children: [{
                text: imgFile
            }],
        }], {
            at: pos
        })
        Transforms.removeNodes(editor, { at: pos })
    }
}