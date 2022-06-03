import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import LiveEditor from './editor/LiveEditor'
import MarkdownPreviewExample from './MarkdownPreviewExample'
import CodeHighlightingExample from './CodeHighlightingExample'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      {/* <LiveEditor /> */}
      <MarkdownPreviewExample/>
      {/* <CodeHighlightingExample/> */}
    </div>
  )
}

export default App
