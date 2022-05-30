import { useState } from "react"
import Heading from "./components/Heading"

export default function LiveEditor() {

    const [input, setInput] = useState("")

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    }

    return (
        <div contentEditable="true"
            suppressContentEditableWarning={true}
            onBlur={handleBlur}
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