import CustomText from "../CustomText"

export type CodeElementType = {
    type: 'code'
    children: CustomText[]
}

export const CodeElement = (props: any) => {
    return (
      <pre {...props.attributes}>
        <code>{props.children}</code>
      </pre>
    )
}