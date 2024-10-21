import { useSlate } from "slate-react";
import { Button } from "@/components/ui/button";
import { Volume2 } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { getCurrentWords } from "../../util";
import { addVolume } from "./helper";

export const AddVolumeBtn = () => {
  const editor = useSlate();

  const handleClick = () => {
    // volume: 0.1 ~ 100.0
    const words = getCurrentWords(editor);
    if (!words) return;

    addVolume(editor, 100);
  };

  const buttonDisabled = () => {
    const word = getCurrentWords(editor);
    if (!word) return true;
    return word.length < 1;
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Button
            variant="ghost"
            className="h-14 w-auto px-2 inline-flex flex-col"
            onClick={handleClick}
            disabled={buttonDisabled()}
          >
            <Volume2 />
            <span>局部音量</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>选中文字后使用</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
