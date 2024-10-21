import { Editor, Transforms } from "slate";
import { ReactEditor, RenderLeafProps } from "slate-react";

export const addVolume = (editor: Editor, volume: number) => {
  editor.addMark("volume", volume);
};

export const removeVolume = (editor: Editor, nodeProps: RenderLeafProps) => {
  const path = ReactEditor.findPath(editor, nodeProps.text);
  Transforms.unsetNodes(editor, "volume", { at: path });
};

export const updateVolume = (editor: Editor, nodeProps: RenderLeafProps, newRate: number) => {
  const path = ReactEditor.findPath(editor, nodeProps.text);
  Transforms.setNodes(editor, { volume: newRate }, { at: path });
};
