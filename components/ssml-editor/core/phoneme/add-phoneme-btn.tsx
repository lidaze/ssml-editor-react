// import { Tooltip } from "antd";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";
import { useSlate } from "slate-react";
import { Text, Range, Node } from "slate";
import { addPhoneme } from "./helper";
import { fetchPhonemesByWord } from "@/lib/fetch-utils";
import { Mic } from "lucide-react";

export const AddPhonemeBtn = () => {
  const editor = useSlate();
  const { toast } = useToast();
  // const [loading, setLoading] = useState(false);

  const getCurrentWork = () => {
    const selection = editor.selection;
    if (!selection) return null;

    const [start, end] = Range.edges(selection);
    const startNode = Node.get(editor, start.path);
    const endNode = Node.get(editor, end.path);

    if (Text.isText(startNode) && Text.isText(endNode)) {
      return startNode.text.slice(start.offset, end.offset);
    }

    return null;
  };

  const handlePronunciationClick = async () => {
    const word = getCurrentWork();
    if (!word) return;

    // setLoading(true);
    const phonemeOptions = await fetchPhonemesByWord(word);
    // setLoading(false);

    if (phonemeOptions.length !== 0) {
      addPhoneme(editor, phonemeOptions[0], phonemeOptions);
    } else {
      toast({ description: `${word}不是多音字` });
    }
  };

  /**
   * 动态设置
   * @returns
   */
  const phonemeBtnDisabled = () => {
    const word = getCurrentWork();
    if (!word) return true;
    return word.length !== 1;
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Button
            variant="ghost"
            size="icon"
            className="size-14 inline-flex flex-col"
            onClick={handlePronunciationClick}
            disabled={phonemeBtnDisabled()}
            // loading={loading}
          >
            <Mic />
            <span>多音</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>{phonemeBtnDisabled() ? "需选中单字使用" : ""}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
