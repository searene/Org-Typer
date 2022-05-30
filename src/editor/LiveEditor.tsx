import { useCallback, useMemo, useState } from "react"
import { BaseEditor, createEditor, Descendant, Editor, NodeEntry, Transforms, Text } from 'slate'
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

  const renderLeaf = useCallback((props: any): JSX.Element => {
    return <Leaf {...props} />;
  }, []);

  const initialValue: Descendant[] = [
    {
      type: 'paragraph',
      children: [{ text: 'abc' }],
    },
  ]

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

  const renderElement = useCallback((props: any) => {
    switch (props.element.type) {
      case 'code':
        return <CodeElement {...props} />
      default:
        return <ParagraphElement {...props} />
    }
  }, [])

  return (
    <Slate editor={editor} value={initialValue}>
      <Editable
        renderElement={renderElement}
        decorate={decorate}
        renderLeaf={renderLeaf}
        onKeyDown={event => {
          if (event.key === '`' && event.ctrlKey) {
            // Prevent the "`" from being inserted by default.
            event.preventDefault()
            // Otherwise, set the currently selected blocks type to "code".
            Transforms.setNodes(
              editor,
              { type: 'code' },
              { match: n => Editor.isBlock(editor, n) }
            )
          }
        }}
      />
    </Slate>
  )
}