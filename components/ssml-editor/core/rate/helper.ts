import { Editor, Transforms } from "slate";
import { ReactEditor, RenderLeafProps } from "slate-react";

export const addRate = (editor: Editor, rate: number) => {
  editor.addMark("rate", rate);
};

export const removeRate = (editor: Editor, nodeProps: RenderLeafProps) => {
  const path = ReactEditor.findPath(editor, nodeProps.text);
  Transforms.unsetNodes(editor, "rate", { at: path });
};

export const updateRate = (editor: Editor, nodeProps: RenderLeafProps, newRate: number) => {
  const path = ReactEditor.findPath(editor, nodeProps.text);
  Transforms.setNodes(editor, { rate: newRate }, { at: path });
};
