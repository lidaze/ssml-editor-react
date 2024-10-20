import { type RenderLeafProps } from "slate-react";

import { BreakTimeLeaf } from "./core/break/break-time-leaf";
import { PhonemeLeaf } from "./core/phoneme/phoneme-leaf";

export const Leaf = (props: RenderLeafProps) => {
  const { breakTime, phoneme } = props.leaf;

  if (breakTime !== undefined) return <BreakTimeLeaf {...props} />;

  if (phoneme) return <PhonemeLeaf {...props} />;

  return <span {...props.attributes}>{props.children}</span>;
};
