import { useCallback, useMemo, useState } from "react"
import { BaseEditor, createEditor, Descendant, Editor, Transforms } from 'slate'
import { Editable, ReactEditor, Slate, withReact } from 'slate-react'
import { HistoryEditor } from 'slate-history'
import CustomText from "./CustomText"
import { HeadingElementType } from "./elements/HeadingElement"
import { ParagraphElement, ParagraphElementType } from "./elements/ParagraphElement"
import { CodeElement, CodeElementType } from "./elements/CodeElement"

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor & HistoryEditor
    Element: HeadingElementType | ParagraphElementType | CodeElementType
    Text: CustomText
  }
}

export default function LiveEditor() {

    const initialValue: Descendant[] = [
        {
            type: 'paragraph',
            children: [{ text: 'A line of text in a paragraph.' }],
          },
    ]

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
                }}}
            />
        </Slate>
    )
}