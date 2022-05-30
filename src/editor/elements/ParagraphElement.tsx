import CustomText from "../CustomText"

export type ParagraphElementType = {
    type: 'paragraph'
    children: CustomText[]
}

export const ParagraphElement = (props: any) => {
    return (
      <p {...props.attributes}>
        {props.children}
      </p>
    )
}