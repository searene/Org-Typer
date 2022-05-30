interface HeadingProps {
    text: string;
}

export default function Heading(props: HeadingProps) {
    return (
        <h1>{props.text}</h1>
    )
}