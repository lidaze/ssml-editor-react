import clsx from "clsx";
import { AddBreakTimeBtn } from "./core/break/add-break-time-btn";
import { AddPhonemeBtn } from "./core/phoneme/add-phoneme-btn";
import { AddRateBtn } from "./core/rate/add-rate-btn";

// Define our own custom set of helpers.
// export const CustomEditor = {
//   isBoldMarkActive(editor: Editor) {
//     const marks = Editor.marks(editor);
//     return marks ? marks.bold === true : false;
//   },
//   isCodeBlockActive(editor: Editor) {
//     const [match] = Editor.nodes(editor, {
//       match: (n) => {
//         return (n as any).type === "code";
//       },
//     });
//     return !!match;
//   },

//   toggleBoldMark(editor: Editor) {
//     const isActive = CustomEditor.isBoldMarkActive(editor);
//     if (isActive) {
//       Editor.removeMark(editor, "bold");
//     } else {
//       Editor.addMark(editor, "bold", true);
//     }
//   },
//   toggleCodeBlock(editor: Editor) {
//     const isActive = CustomEditor.isCodeBlockActive(editor);
//     // isn't working
//     Transforms.setNodes(
//       editor,
//       { type: isActive ? "paragraph" : "code" },
//       { match: (n: any) => Editor.isBlock(editor, n) }
//     );
//   },
// };

export interface SSMLToolbarProps {
  className?: string;
}

const SSMLToolbar = ({ className }: SSMLToolbarProps) => {
  return (
    <div className={clsx("p-2 flex justify-start items-center space-x-2", className)}>
      <AddBreakTimeBtn />
      <AddPhonemeBtn />
      <AddRateBtn />
    </div>
  );
};

export default SSMLToolbar;
