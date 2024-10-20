import { type RenderPlaceholderProps, type RenderElementProps } from "slate-react";
import React from "react";

// Define a React Component renderer for our code blocks
export const CodeElement = (props: RenderElementProps) => {
  return (
    <pre {...props.attributes}>
      <code>{props.children}</code>
    </pre>
  );
};

export const BreakTimeElement = (props: RenderElementProps) => {
  return (
    <p className="inline-block bg-red-50" {...props.attributes}>
      {props.children}
    </p>
  );
};

// define a React Component renderer for default elements
export const DefaultElement = (props: RenderElementProps) => {
  return (
    <p className="my-2" {...props.attributes}>
      {props.children}
    </p>
  );
};

export const EditorPlaceholder = ({ attributes, children }: RenderPlaceholderProps) => {
  return (
    <span
      {...attributes}
      className="my-2 text-gray-400"
      contentEditable={false}
      style={{ position: "absolute", top: 12 }}
    >
      {children}
    </span>
  );
};

export const TypeAndElementKV: Record<string, React.ElementType> = {
  code: CodeElement,
  breakTime: BreakTimeElement,
  paragraph: DefaultElement,
};
