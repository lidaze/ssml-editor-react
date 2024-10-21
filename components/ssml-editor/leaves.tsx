import { type RenderLeafProps } from "slate-react";

import { BreakTimeLeaf } from "./core/break/break-time-leaf";
import { PhonemeLeaf } from "./core/phoneme/phoneme-leaf";
import { RateLeaf } from "./core/rate/rate-leaf";
import { VolumeLeaf } from "./core/volume/volume-leaf";

export const Leaf = (props: RenderLeafProps) => {
  const { breakTime, phoneme, rate, volume } = props.leaf;

  if (breakTime !== undefined) return <BreakTimeLeaf {...props} />;

  if (phoneme) return <PhonemeLeaf {...props} />;

  if (rate !== undefined) return <RateLeaf {...props} />;

  if (volume !== undefined) return <VolumeLeaf {...props} />;

  return <span {...props.attributes}>{props.children}</span>;
};
