import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import LiveEditor from './editor/LiveEditor'
import MentionExample from './slate-examples/examples/Mention'
import TablesExample from './slate-examples/examples/Tables'
import EditableTable from './editable-table/EditableTable'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <EditableTable/>
      {/* <LiveEditor /> */}
      {/* <TablesExample/> */}
      {/* <MentionExample /> */}
      {/* <CodeMirrorTest/> */}
      {/* <MarkdownPreviewExample/> */}
      {/* <CodeHighlightingExample/> */}
      {/* <SlateExample /> */}
    </div>
  )
}

export default App
