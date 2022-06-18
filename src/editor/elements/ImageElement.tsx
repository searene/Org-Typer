import { RenderElementProps } from "slate-react"
import { BackendFactory } from "../../backend/factory/BackendFactory"

export type ImagePath = {
    text: string,
}
export type ImageElementType = {
    type: 'image',
    children: ImagePath[],
}

export const ImageElement = (props: RenderElementProps) => {

    const getImageSrc = (props: RenderElementProps): string => {
        const filePath = (props.element as ImageElementType).children[0].text
        if (filePath.startsWith("http://") || filePath.startsWith("https://")) {
            return filePath
        }
        if (filePath.startsWith("file:")) {
            const backend = BackendFactory.get()
            return backend.convertLocalSrc(filePath.substring("file:".length))
        } else {
            return filePath
        }
    }

    return (
        <div {...props.attributes}>
            <span style={{
                visibility: "hidden"
            }}>
                {props.children}
            </span>
            <br/>
            <img src={getImageSrc(props)} />
        </div>
    )
}