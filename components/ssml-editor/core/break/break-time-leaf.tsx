import { type RenderLeafProps } from "slate-react";

import clsx from "clsx";
import { useSlate } from "slate-react";
import { removeBreakTimeNode, updaetBreakTimeValue } from "./helper";
import { Clock, CircleX, Trash } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export const BreakTimeLeaf = (props: RenderLeafProps) => {
  const editor = useSlate();
  const { breakTime } = props.leaf;

  const handleInputChange = (value: string) => {
    updaetBreakTimeValue(editor, props, +value || 0.5);
  };

  const removeBreakTime = () => removeBreakTimeNode(editor, props);

  return (
    <Popover>
      <PopoverTrigger>
        <span
          className={clsx(
            "align-middle inline-flex items-center justify-between w-17 mx-1 py-0.5 px-1",
            "leading-none rounded-md bg-red-500",
            "transition-transform duration-150 ease-in-out hover:scale-110"
          )}
          contentEditable={false}
          {...props.attributes}
        >
          <span hidden>{props.children}</span>
          <Clock className="size-4" />
          <span className="text-xs mx-1">{+(breakTime ?? 0)}s</span>
          <CircleX className="size-4 cursor-pointer" onClick={removeBreakTime} />
        </span>
      </PopoverTrigger>
      <PopoverContent className="flex w-auto p-1" side="top">
        <ToggleGroup
          size="sm"
          type="single"
          value={String(breakTime)}
          onValueChange={handleInputChange}
        >
          <ToggleGroupItem value="0.5">0.5s</ToggleGroupItem>
          <ToggleGroupItem value="1.0">1.0s</ToggleGroupItem>
          <ToggleGroupItem value="1.5">1.5s</ToggleGroupItem>
          <ToggleGroupItem value="2.0">2.0s</ToggleGroupItem>
        </ToggleGroup>

        <Button variant="ghost" size="icon" onClick={removeBreakTime}>
          <Trash className="text-red-500" />
        </Button>
      </PopoverContent>
    </Popover>
  );
  {
    /* </Popover> */
  }
};
