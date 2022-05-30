import { useState } from "react"
import Heading from "./components/Heading"
import { BaseEditor, createEditor, Descendant } from 'slate'
import { ReactEditor, Slate, withReact } from 'slate-react'

type CustomElement = { type: 'paragraph'; children: CustomText[] }
type CustomText = { text: string }

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor
    Element: CustomElement
    Text: CustomText
  }
}

export default function LiveEditor() {

    const initialValue: Descendant[] = []

    const [editor] = useState(() => withReact(createEditor()))

    return (
        <Slate editor={editor} value={initialValue}>
            test
        </Slate>
    )
}