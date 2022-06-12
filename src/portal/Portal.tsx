import ReactDOM from "react-dom"

interface ProtalProps {
    children: React.ReactNode
}

export const Portal = ({ children }: ProtalProps) => {
    return typeof document === 'object'
        ? ReactDOM.createPortal(children, document.body)
        : null
}
