import clsx from "clsx";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export interface PhonemesListProps {
  phoneme?: string;
  phonemeOptions?: string[];
  onPhonemeChange?: (phoneme: string) => void;
}

const PhonemesList: React.FC<PhonemesListProps> = ({
  phoneme,
  phonemeOptions = [],
  onPhonemeChange,
}) => {
  const [customPhoneme, setCustomPhoneme] = useState(() => {
    return phonemeOptions.includes(phoneme!) ? "" : phoneme;
  });

  const handleCustomPhonemeChange = (newPhoneme: string) => {
    setCustomPhoneme(newPhoneme);

    if (newPhoneme.length === 0) {
      onPhonemeChange?.(phonemeOptions[0]);
    } else {
      onPhonemeChange?.(newPhoneme);
    }
  };

  return (
    <div className="flex gap-2 items-center">
      <ToggleGroup size="sm" type="single" value={phoneme} onValueChange={onPhonemeChange}>
        {phonemeOptions.map((item, index) => (
          <ToggleGroupItem key={index} value={item}>
            {item}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>

      <Input
        className={clsx(phoneme === customPhoneme && "py-0 px-2 bg-accent")}
        style={{ width: 80, height: 30 }}
        placeholder="自定义"
        type="text"
        value={customPhoneme}
        onChange={(e) => handleCustomPhonemeChange(e.target.value)}
        onFocus={() => customPhoneme && onPhonemeChange?.(customPhoneme)}
      />
    </div>
  );
};

export default PhonemesList;
