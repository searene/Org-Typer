import { useCallback, useMemo, useState } from "react"
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { BaseEditor, createEditor, Descendant, Editor, Node, NodeEntry, Text, Transforms } from 'slate'
import { Editable, ReactEditor, RenderElementProps, Slate, withReact } from 'slate-react'
import { HistoryEditor } from 'slate-history'
import CustomText from "./CustomText"
import { HeadingElementType } from "./elements/HeadingElement"
import { ParagraphElement, ParagraphElementType } from "./elements/ParagraphElement"
import { CodeBlockElementType, CodeBlockElement } from "./elements/CodeBlockElement"
import TextParser from "../parser/TextParser"
import { Leaf } from "./Leaf"
import { CustomRange } from "./CustomRange"
import { RangeConverter } from "./RangeConverter"
import { BlockTransformChecker } from "../engine/BlockTransformChecker"
import TextNodeType from "../parser/node/type/TextNodeType"

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor & HistoryEditor
    Element: HeadingElementType | ParagraphElementType | CodeBlockElementType
    Text: CustomText
  }
}

export default function LiveEditor() {

  const [editorValue, setEditorValue] = useState<Descendant[]>([{
    type: 'paragraph',
    children: [{ text: '' }],
  }])

  const renderLeaf = useCallback((props: any): JSX.Element => {
    return <Leaf {...props} />;
  }, []);

  const decorate = useCallback((nodeEntry: NodeEntry) => {
    const node = nodeEntry[0];
    const path = nodeEntry[1];

    if (!Text.isText(node)) {
      return []
    }
    
    const orgParser = new TextParser();
    const rootNode = orgParser.parse(node.text)
    const ranges: CustomRange[] = RangeConverter.convertTextNodeToRanges(rootNode, path);
    console.log(ranges)
    return ranges;
  }, []);

  const editor = useMemo(() => withReact(createEditor()), [])

  const getCurrentLineText = function(): string | undefined {
    const node = Node.get(editor, editor.selection!.anchor!.path);
    if (Text.isText(node)) {
      return node.text;
    } else {
      return undefined;
    }
  };

  const renderElement = (props: RenderElementProps): JSX.Element => {
    if (props.element.type === 'paragraph') {
      return <ParagraphElement {...props} />;
    } else if (props.element.type === 'codeBlock') {
      return <CodeBlockElement {...props} />;
    } else {
      throw new Error(`Unknown element type: ${props.element.type}`);
    }
  }

  return (
    <Slate editor={editor} value={editorValue} onChange={setEditorValue}>
      <Editable
        decorate={decorate}
        renderLeaf={renderLeaf}
        renderElement={renderElement}
        placeholder="Write something..."
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          margin: "50px",
        }}
        onKeyDown={event => {
          if (event.key === ' ') {
            const line = getCurrentLineText();
            if (line === undefined) {
              return;
            }
            const textNodeType = BlockTransformChecker.getBlockNodeType(line);
            if (textNodeType === undefined) {
              return;
            }
            if (textNodeType === TextNodeType.CodeBlock) {
              event.preventDefault();
              Transforms.setNodes(editor, { type: 'codeBlock' })
            }
          }
        }}
      />
    </Slate>
  )
}