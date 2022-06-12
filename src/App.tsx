import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import LiveEditor from './editor/LiveEditor'
import { MarkdownPreviewExample } from './slate-examples/MarkdownPreviewExample'
import { SlateExample } from './slate-examples/SlateExample'
import CodeMirrorTest from './editor/CodeMirrorTest'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <LiveEditor />
      {/* <CodeMirrorTest/> */}
      {/* <MarkdownPreviewExample/> */}
      {/* <CodeHighlightingExample/> */}
      {/* <SlateExample /> */}
    </div>
  )
}

export default App
