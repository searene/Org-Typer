import { useState } from "react"

export default function LiveEditor() {

  const [input, setInput] = useState("")

    return (
        <textarea value={input}
               onChange={e => setInput(e.target.value)}
               style={{
                   width: "100%",
                   height: "100%",
                   position: "absolute",
                   top: 0,
                   left: 0,
               }}/>
    )

}