import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { BaseEditor, createEditor, Descendant, Range, Editor, Node, NodeEntry, Text, Transforms } from 'slate'
import { Editable, ReactEditor, RenderElementProps, Slate, withReact } from 'slate-react'
import { HistoryEditor, withHistory } from 'slate-history'

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor & HistoryEditor
    Element: HeadingElementType | ParagraphElementType | CodeBlockElementType | TableElementType | TableRowElementType | TableCellElementType | ImageElementType
    Text: CustomText
  }
}

type Command = {
  text: string,
  value: 'insert-table' | 'insert-code-block' | 'insert-image',
}

const commands: Command[] = [{
  text: "Table",
  value: "insert-table"
}, {
  text: "Code Block",
  value: "insert-code-block"
}, {
  text: "Image",
  value: "insert-image",
}]

export function SlateTest() {

  const commandDivRef = useRef<HTMLDivElement | null>(null)
  const [selectedCommandIndex, setSelectedCommandIndex] = useState<number>(0);
  const [isCommandListVisible, setIsCommandListVisible] = useState<boolean>(false);
  const [commandInput, setCommandInput] = useState("")
  const [editorValue, setEditorValue] = useState<Descendant[]>([{
    type: 'paragraph',
    children: [{ text: 'ABC' }],
  }, {
    type: 'paragraph',
    children: [{ text: "CDE" }],
  }])

  const getFilteredCommand = () => {
    return commands.filter(command => command.text.toLowerCase().includes(commandInput.toLowerCase()))
  }

  const editor = useMemo(() => TableUtils.withTable(withHistory(withReact(createEditor()))), [])

  const getCurrentLineText = function (): string | undefined {
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
    } else if (['table', 'tableRow', 'tableCell'].includes(props.element.type)) {
      return <TableElement {...props} editor={editor}/>
    } else if (props.element.type === 'image') {
      return <ImageElement {...props} />
    } else {
      throw new Error(`Unknown element type: ${props.element.type}`);
    }
  }

  const transformToCodeBlock = (editor: Editor) => {
    const { selection } = editor;
    if (!selection || !Range.isCollapsed(selection)) {
      return;
    }
    const [start] = Range.edges(selection)
    Transforms.delete(editor, { at: start, unit: "line", reverse: true });
  }

  useEffect(() => {
    if (isCommandListVisible) {
      const { selection } = editor;
      if (!selection || !Range.isCollapsed(selection)) {
        return;
      }
      const reactDOMRange = ReactEditor.toDOMRange(editor, selection);
      const rect = reactDOMRange.getBoundingClientRect()
      const current = commandDivRef.current!;
      current.style.top = `${rect.top + window.pageYOffset + 24}px`
      current.style.left = `${rect.left + window.pageXOffset}px`
    }
  }, [isCommandListVisible]);

  const tryConsumeKeyWithCommandList = (event: React.KeyboardEvent): boolean => {
    if (KeyUtils.isCtrlKey(event) && event.key === "/") {
      if (!isCommandListVisible) {
        setIsCommandListVisible(true)
        setSelectedCommandIndex(0);
        setCommandInput("")
      }
      return true;
    }
    if (isCommandListVisible) {
      if (event.key === "ArrowDown" || (event.ctrlKey && event.key === "n")) {
        event.preventDefault();
        const prevIndex = selectedCommandIndex >= commands.length - 1 ? 0 : selectedCommandIndex + 1;
        setSelectedCommandIndex(prevIndex);
        return true;
      } else if (event.key === "ArrowUp" || (event.ctrlKey && event.key === "p")) {
        event.preventDefault()
        const nextIndex = selectedCommandIndex <= 0 ? commands.length - 1 : selectedCommandIndex - 1
        setSelectedCommandIndex(nextIndex)
        return true;
      } else if (event.key === "Tab" || event.key === "Enter") {
        event.preventDefault()
        setIsCommandListVisible(false)
        const command = commands[selectedCommandIndex].value;
        if (command === 'insert-table') {
          TableUtils.insertNewTable(editor)
        } else if (command === 'insert-image') {
          ImageUtils.insertImage(editor);
        }
        return true;
      } else if (event.key === 'Escape') {
        event.preventDefault()
        setIsCommandListVisible(false);
        return true;
      } else if (/^[a-zA-Z0-9]$/.test(event.key)) {
        setCommandInput(commandInput + event.key);
        return true;
      } else if (event.key === 'Backspace') {
        if (commandInput.length > 0) {
          setCommandInput(commandInput.slice(0, -1));
        } else {
          setIsCommandListVisible(false)
        }
        return true;
      }
    }
    return false;
  }

  return (
    <Slate editor={editor} value={editorValue} onChange={setEditorValue}>
      <Editable
        decorate={decorate}
        renderLeaf={renderLeaf}
        renderElement={renderElement}
        placeholder="Press 'command + /' for commands"
        style={{
          maxWidth: "90vw",
          margin: "50px",
        }}
        onKeyDown={event => {
          const isKeyConsumedByCommandList = tryConsumeKeyWithCommandList(event);
          if (isKeyConsumedByCommandList) {
            return;
          }
          if (KeyUtils.isCtrlKey(event) && event.key === "/") {
            setIsCommandListVisible(true);
          } else if (event.key === ' ') {
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
              transformToCodeBlock(editor);
              Transforms.setNodes(editor, { type: 'codeBlock' })
            }
          }
        }}
      />
      {isCommandListVisible &&
        <Portal>
          <div
            ref={commandDivRef}
            style={{
              top: '-9999px',
              left: '-9999px',
              position: 'absolute',
              zIndex: 1,
              padding: '3px',
              background: 'white',
              borderRadius: '4px',
              boxShadow: '0 1px 5px rgba(0,0,0,.2)',
            }}>
            {getFilteredCommand().map((command, i) => (
              <div key={command.value}
                style={{
                  padding: '1px 3px',
                  borderRadius: '3px',
                  background: i === selectedCommandIndex ? '#B4D5FF' : 'transparent',
                }}>
                {command.text}
              </div>
            ))}
          </div>
        </Portal>
      }
    </Slate>
  )
}