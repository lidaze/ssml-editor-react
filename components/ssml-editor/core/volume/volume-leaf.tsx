import { type RenderLeafProps } from "slate-react";
import clsx from "clsx";
import { useSlate } from "slate-react";
import { CircleX, Trash, Volume1 } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { removeVolume, updateVolume } from "./helper";
import VolumeSlider from "./volume-slider";

export const VolumeLeaf = (props: RenderLeafProps) => {
  const editor = useSlate();
  const { volume } = props.leaf;

  const handleRemove = () => removeVolume(editor, props);

  const handleValueChange = (newVolume: number) => {
    updateVolume(editor, props, newVolume);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <span
          className={clsx(
            "align-middle inline-flex gap-x-0.5 items-center justify-between mx-1 py-0.5 px-1",
            "leading-none rounded-md bg-purple-500",
            "transition-transform duration-150 ease-in-out hover:scale-110"
          )}
          contentEditable={false}
          {...props.attributes}
        >
          <Volume1 className="size-4" />
          <span className="text-xs w-6 text-center">{volume}</span>
          <span>{props.children}</span>
          <CircleX className="size-4 cursor-pointer" onClick={handleRemove} />
        </span>
      </PopoverTrigger>
      <PopoverContent className="flex w-auto p-1 items-center" side="top">
        <VolumeSlider className="ml-2" value={volume || 100} onValueChange={handleValueChange} />
        <Button className="ml-2" variant="ghost" size="icon" onClick={handleRemove}>
          <Trash className="text-red-500" />
        </Button>
      </PopoverContent>
    </Popover>
  );
};
