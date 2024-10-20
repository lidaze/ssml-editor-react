import { type RenderLeafProps } from "slate-react";
import clsx from "clsx";
import { useSlate } from "slate-react";
import { CircleX, Trash } from "lucide-react";
import { removePhoneme, updatePhoneme } from "./helper";
import PhonemesList from "./phoneme-list";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

export const PhonemeLeaf = (props: RenderLeafProps) => {
  const editor = useSlate();
  const { phoneme, phonemeOptions = [] } = props.leaf;

  const handleRemove = () => removePhoneme(editor, props);

  const handlePhonemeChange = (newPhoneme: string) => {
    updatePhoneme(editor, props, newPhoneme);
  };

  return (
    <Popover>
      <PopoverTrigger>
        <span
          className={clsx(
            "align-middle inline-flex gap-x-0.5 items-center justify-between mx-1 py-0.5 px-1",
            "leading-none rounded-md bg-blue-500",
            "transition-transform duration-150 ease-in-out hover:scale-110"
          )}
          contentEditable={false}
          {...props.attributes}
        >
          <span>{props.children}</span>
          <span className="mx-1">({phoneme})</span>
          <CircleX className="size-4 cursor-pointer" onClick={handleRemove} />
        </span>
      </PopoverTrigger>
      <PopoverContent className="flex w-auto p-1" side="top">
        <PhonemesList
          phoneme={phoneme}
          phonemeOptions={phonemeOptions}
          onPhonemeChange={handlePhonemeChange}
        />
        <Button className="ml-2" variant="ghost" size="icon" onClick={handleRemove}>
          <Trash className="text-red-500" />
        </Button>
      </PopoverContent>
    </Popover>
  );
};
