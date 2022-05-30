import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import LiveEditor from './LiveEditor'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <LiveEditor />
    </div>
  )
}

export default App
