import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import LiveEditor from './editor/LiveEditor'
import MentionExample from './slate-examples/examples/Mention'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <LiveEditor />
      {/* <MentionExample /> */}
      {/* <CodeMirrorTest/> */}
      {/* <MarkdownPreviewExample/> */}
      {/* <CodeHighlightingExample/> */}
      {/* <SlateExample /> */}
    </div>
  )
}

export default App
