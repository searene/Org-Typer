import { useState } from "react"
import Heading from "./components/Heading"

export default function LiveEditor() {

  const [input, setInput] = useState("")

    return (
        <div contentEditable="true"
               style={{
                   width: "100%",
                   height: "100%",
                   position: "absolute",
                   top: 0,
                   left: 0,
               }}>

            <Heading text="Test" />
        </div>
    )

}