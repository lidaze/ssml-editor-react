"use client";

import { type Descendant } from "slate";

import clsx from "clsx";
import { useMemo, useState } from "react";
import { createEditor } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import { deserialize, serialize } from "./util";
import { Leaf } from "./leaves";
import { DefaultElement, EditorPlaceholder } from "./elements";
import SSMLToolbar from "./toolbar";

export interface SSMLEditorProps {
  className?: string;
  toolbarClassName?: string;
  editorClassName?: string;
  text?: string;
  onTextChange?: (text: string) => void;
}
const SSMLEditor = ({
  className,
  toolbarClassName,
  editorClassName,
  text = "",
  onTextChange,
}: SSMLEditorProps) => {
  const [editor] = useState(() => withReact(createEditor()));

  const initialValue = useMemo(() => {
    const descendants = deserialize(text);
    return descendants;
    // eslint-disable-next-line
  }, []);

  // const renderLeaf = useCallback((props: RenderLeafProps) => {
  //   return <Leaf {...props} />;
  // }, []);

  const handleValueChange = (value: Descendant[]) => {
    const isAstChange = editor.operations.some((op) => "set_selection" !== op.type);
    if (isAstChange) {
      onTextChange?.(serialize(value));
    }
  };

  return (
    <div className={clsx("border rounded-md", className)}>
      <Slate editor={editor} initialValue={initialValue} onChange={handleValueChange}>
        <SSMLToolbar className={clsx("border-b", toolbarClassName)} />
        <Editable
          className={clsx(
            "text-base p-3 overflow-y-auto",
            "leading-loose focus-visible:outline-none break-words",
            editorClassName
          )}
          style={{ minHeight: 144 }}
          renderElement={DefaultElement}
          renderLeaf={Leaf}
          placeholder="请输入内容..."
          renderPlaceholder={EditorPlaceholder}
        />
      </Slate>
    </div>
  );
};

export default SSMLEditor;
