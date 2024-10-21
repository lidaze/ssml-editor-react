import clsx from "clsx";
import xmlFormatter from "xml-formatter";
import { Textarea } from "@/components/ui/textarea";

interface Props {
  className?: string;
  ssml: string;
}

export default function XMLViewer({ className, ssml }: Props) {
  const formated = xmlFormatter(ssml);

  return (
    <div className={clsx("", className)}>
      <Textarea className="min-h-80 h-auto" value={formated} disabled />
    </div>
  );
}
