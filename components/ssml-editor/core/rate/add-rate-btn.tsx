import { useSlate } from "slate-react";
import { Button } from "@/components/ui/button";
import { Gauge } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { getCurrentWords } from "../../util";
import { addRate } from "./helper";

export const AddRateBtn = () => {
  const editor = useSlate();

  const handleClick = () => {
    // range: 0.5 ~ 1 ~ 2
    const words = getCurrentWords(editor);
    if (!words) return;

    addRate(editor, 1);
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
            <Gauge />
            <span>局部变速</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>选中文字后使用</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
