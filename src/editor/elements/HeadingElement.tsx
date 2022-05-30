import CustomText from "../CustomText"

export type HeadingElementType = {
    type: 'heading'
    level: number
    children: CustomText[]
}

export const HeadingElement = (props: any) => {
    return (
      <h1 {...props.attributes}>
        {props.children}
      </h1>
    )
}