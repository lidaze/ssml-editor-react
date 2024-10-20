import { useSlate } from "slate-react";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";
import { insertBreakTime } from "./helper";

export const AddBreakTimeBtn = () => {
  const editor = useSlate();

  const handleClick = () => {
    insertBreakTime(editor, { text: "b", breakTime: 0.5 });
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className="size-14 inline-flex flex-col"
      onClick={handleClick}
    >
      <Clock />
      <span>停顿</span>
    </Button>
  );
};
