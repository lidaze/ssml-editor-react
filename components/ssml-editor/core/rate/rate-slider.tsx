import clsx from "clsx";
import { Slider } from "@/components/ui/slider";

interface Props {
  className?: string;
  value: number;
  onValueChange?: (value: number) => void;
}

export default function RateSlider({ className, value, onValueChange }: Props) {
  const handleValueChange = (values: number[]) => {
    onValueChange?.(values[0]);
  };

  return (
    <div className={clsx("flex flex-col items-center justify-center p-1.5 space-y-1.5", className)}>
      <Slider
        className={clsx("w-40", className)}
        value={[value]}
        min={0.5}
        max={2}
        step={0.1}
        onValueChange={handleValueChange}
      />
      <div className="relative px-0.5 w-full flex text-xs">
        <span>0.5x</span>
        <span className="absolute top-0 left-1/3 -ml-1.5">1x</span>
        <span className="ml-auto">2.0x</span>
      </div>
    </div>
  );
}
