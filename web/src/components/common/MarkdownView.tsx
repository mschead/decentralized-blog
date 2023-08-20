import Markdown from "markdown-to-jsx";

interface Props {
  content: string;
}

const MarkdownView = ({ content }: Props) => {
  return <Markdown>{content}</Markdown>;
};

export default MarkdownView;
