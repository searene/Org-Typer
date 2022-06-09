import CustomText from "../CustomText"

export type CodeBlockElementType = {
    type: 'codeBlock'
    children: CustomText[]
}

export const CodeBlockElement = (props: any) => {
    return (
      <div>
        <pre {...props.attributes}>
          <code>{props.children}</code>
        </pre>
      </div>
    )
}