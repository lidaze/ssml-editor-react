import { type RenderLeafProps } from "slate-react";
import clsx from "clsx";
import { useSlate } from "slate-react";
import { CircleX, Trash, Gauge } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { removeRate, updateRate } from "./helper";
import RateSlider from "./rate-slider";

export const RateLeaf = (props: RenderLeafProps) => {
  const editor = useSlate();
  const { rate } = props.leaf;

  const handleRemove = () => removeRate(editor, props);

  const handleRateValueChange = (newRate: number) => {
    updateRate(editor, props, newRate);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <span
          className={clsx(
            "align-middle inline-flex gap-x-0.5 items-center justify-between mx-1 py-0.5 px-1",
            "leading-none rounded-md bg-orange-500",
            "transition-transform duration-150 ease-in-out hover:scale-110"
          )}
          contentEditable={false}
          {...props.attributes}
        >
          <Gauge className="size-4" />
          <span className="text-xs w-7">{rate?.toFixed(1)}x</span>
          <span>{props.children}</span>
          <CircleX className="size-4 cursor-pointer" onClick={handleRemove} />
        </span>
      </PopoverTrigger>
      <PopoverContent className="flex w-auto p-1 items-center" side="top">
        <RateSlider className="" value={rate || 1} onValueChange={handleRateValueChange} />
        <Button className="ml-2" variant="ghost" size="icon" onClick={handleRemove}>
          <Trash className="text-red-500" />
        </Button>
      </PopoverContent>
    </Popover>
  );
};
