import { Editor, Transforms, Range } from "slate";
import { ReactEditor, RenderLeafProps } from "slate-react";

export type BreakTimeNode = {
  text: "b";
  breakTime: number;
};

/**
 *
 * @param editor
 * @param node
 * @returns
 */
export const insertBreakTime = (editor: Editor, node: BreakTimeNode) => {
  const selection = editor.selection;
  if (!selection) return;

  const isPureCursor = Range.isCollapsed(selection);

  if (isPureCursor) {
    editor.insertNode(node);
  } else {
    const end = Range.end(selection);
    Transforms.insertNodes(editor, node, { at: end });
  }

  // Focus the editor after inserting the node
  ReactEditor.focus(editor);

  const newSelection = editor.selection;
  if (!newSelection) return;

  if (isPureCursor) {
    const afterPoint = Editor.after(editor, newSelection.anchor);
    if (afterPoint) {
      Transforms.select(editor, afterPoint);
    }
  } else {
    // TODO: issue
    Transforms.select(editor, newSelection.focus);
  }
};

/**
 *
 * @param editor
 * @param nodeProps
 */
export const removeBreakTimeNode = (editor: Editor, nodeProps: RenderLeafProps) => {
  const path = ReactEditor.findPath(editor, nodeProps.text);
  Transforms.removeNodes(editor, { at: path });
};

/**
 *
 * @param editor
 * @param nodeProps
 * @param value
 */
export const updaetBreakTimeValue = (editor: Editor, nodeProps: RenderLeafProps, value: number) => {
  const path = ReactEditor.findPath(editor, nodeProps.text);
  Transforms.setNodes(editor, { breakTime: value }, { at: path });
};
