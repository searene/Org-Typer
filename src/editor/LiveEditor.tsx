import { useCallback, useMemo, useState } from "react"
import { BaseEditor, createEditor, Descendant, Editor, NodeEntry, Transforms, Text, Node } from 'slate'
import { Editable, ReactEditor, RenderLeafProps, Slate, withReact } from 'slate-react'
import { HistoryEditor } from 'slate-history'
import CustomText from "./CustomText"
import { HeadingElementType } from "./elements/HeadingElement"
import { ParagraphElement, ParagraphElementType } from "./elements/ParagraphElement"
import { CodeElement, CodeElementType } from "./elements/CodeElement"
import OrgParser from "../parser/OrgParser"
import { Leaf, CustomLeafProps } from "./Leaf"

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor & HistoryEditor
    Element: HeadingElementType | ParagraphElementType | CodeElementType
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
    
    const orgParser = new OrgParser(node.text);
    const orgNodes = orgParser.parse()
    const ranges = []
    for (const orgNode of orgNodes) {
      ranges.push({
        type: orgNode.type,
        anchor: { path, offset: orgNode.start },
        focus: { path, offset: orgNode.end },
      })
    }
    return ranges;
  }, []);

  const editor = useMemo(() => withReact(createEditor()), [])

  return (
    <Slate editor={editor} value={editorValue} onChange={setEditorValue}>
      <Editable
        decorate={decorate}
        renderLeaf={renderLeaf}
        placeholder="Write some org-mode..."
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          margin: "50px",
        }}
      />
    </Slate>
  )
}