import clsx from "clsx";
import { Slider } from "@/components/ui/slider";
import { Volume1 } from "lucide-react";

interface Props {
  className?: string;
  value: number;
  onValueChange?: (value: number) => void;
}

export default function VolumeSlider({ className, value, onValueChange }: Props) {
  const handleValueChange = (values: number[]) => {
    onValueChange?.(values[0]);
  };

  return (
    <div className={clsx("flex flex-row items-center justify-center space-x-1.5", className)}>
      <Volume1 className="size-5" />
      <span className="text-sm">0</span>
      <Slider
        className={clsx("w-40", className)}
        value={[value]}
        min={0}
        max={100}
        step={1}
        onValueChange={handleValueChange}
      />
      <span className="text-sm">100</span>
    </div>
  );
}
