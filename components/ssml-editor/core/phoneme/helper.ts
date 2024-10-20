import { Editor, Transforms } from "slate";
import { ReactEditor, RenderLeafProps } from "slate-react";

export type BreakTimeNode = {
  text: "b";
  breakTime: number;
};

export const addPhoneme = (editor: Editor, phoneme: string, phonemeOptions: string[]) => {
  editor.addMark("phoneme", phoneme);
  editor.addMark("phonemeOptions", phonemeOptions);
};

export const removePhoneme = (editor: Editor, nodeProps: RenderLeafProps) => {
  const path = ReactEditor.findPath(editor, nodeProps.text);
  Transforms.unsetNodes(editor, "phoneme", { at: path });
};

export const updatePhoneme = (editor: Editor, nodeProps: RenderLeafProps, newPhoneme: string) => {
  const path = ReactEditor.findPath(editor, nodeProps.text);
  Transforms.setNodes(editor, { phoneme: newPhoneme }, { at: path });
};
