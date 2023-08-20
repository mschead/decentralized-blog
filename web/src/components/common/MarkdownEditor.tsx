import dynamic from "next/dynamic";
import MarkdownIt from "markdown-it";
import "react-markdown-editor-lite/lib/index.css";
import { ChangeEvent } from "react";

const MdEditor = dynamic(() => import("react-markdown-editor-lite"), {
  ssr: false,
});

const mdParser = new MarkdownIt().use(
  require("markdown-it-front-matter"),
  function () {}
);

interface Props {
  value: string;
  readOnly?: boolean;
  onChange: (
    data: {
      text: string;
      html: string;
    },
    event?: ChangeEvent<HTMLTextAreaElement> | undefined
  ) => void;
}

const MarkdownEditor = ({ value, onChange, readOnly }: Props) => {
  const renderHTML = (content: string) => mdParser.render(content);

  return (
    <MdEditor
      readOnly={readOnly}
      value={value}
      style={{ height: "500px" }}
      renderHTML={renderHTML}
      onChange={onChange}
    />
  );
};

export default MarkdownEditor;
