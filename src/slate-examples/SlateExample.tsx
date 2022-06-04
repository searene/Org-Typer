// Import the `Editor` and `Transforms` helpers from Slate.
import { useCallback, useMemo } from 'react'
import { createEditor, Descendant, Editor, Transforms } from 'slate'
import { Editable, Slate, withReact } from 'slate-react'
import { css } from '@emotion/css'

const initialValue: Descendant[] = [
  {
    type: 'paragraph',
    children: [{ text: 'A line of text in a paragraph.' }],
  },
  {
    type: 'code',
    children: [{
      text: 'some code',
    }]
  },
  {
    type: 'paragraph',
    children: [{ text: 'A line of text in a paragraph.' }],
  }
]

export const SlateExample = () => {
  const editor = useMemo(() => withReact(createEditor()), [])

  const renderElement = useCallback((props: any) => {
    switch (props.element.type) {
      case 'code':
        return <CodeElement {...props} />
      default:
        return <DefaultElement {...props} />
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
            Transforms.wrapNodes(
              editor,
              { type: 'code', children: [{text: ''}] },
              { split: true, at: editor.selection! }
            )
          }
        }}
      />
    </Slate>
  )
}

const CodeElement = (props: any) => {
  return (
    <span {...props.attributes}
      className={css`
            font-family: monospace;
            background: hsla(0, 0%, 100%, .5);`}>
      {props.children}
    </span>
  )
}

const DefaultElement = (props: any) => {
  return <span {...props.attributes}>{props.children}</span>
}