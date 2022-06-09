import CustomText from "../CustomText"
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';

export type CodeBlockElementType = {
    type: 'codeBlock'
    children: CustomText[]
}

export const CodeBlockElement = (props: any) => {
    return (
      <CodeMirror
        {...props.attributes}
        value="console.log('hello world!');"
        height="200px"
        extensions={[javascript({ jsx: true })]}
        onChange={(value, viewUpdate) => {
          console.log('value:', value);
        }}
      >
        {props.children}
      </CodeMirror>
    );
}