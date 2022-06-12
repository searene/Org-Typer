import { RenderElementProps } from "slate-react"

export type ImagePath = {
    text: string,
}
export type ImageElementType = {
    type: 'image',
    children: ImagePath[],
}

export const ImageElement = (props: RenderElementProps) => {
    return (
        <span {...props.attributes}>
            {props.children}
        </span>
    )
}