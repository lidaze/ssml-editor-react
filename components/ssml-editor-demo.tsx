"use client";

import clsx from "clsx";
import SSMLEditor from "./ssml-editor/editor";
import { useState } from "react";
import XMLViewer from "./xml-viewer";

interface Props {
  className?: string;
}

export default function SSMLEditorDemo({ className }: Props) {
  // const [text, setText] = useState(
  //   `<speak><s>那时候苏小姐把自己的爱情看得太名贵了，不肯随便施与。现在呢，宛如做了好衣服，舍不得穿，锁在箱里，过一两年忽然发见这衣服的样子和花色都不时髦了，有些自怅自悔。</s></speak>`
  // );
  const [text, setText] = useState(
    `<speak><s>那时候<break time="1.5"/>苏小姐把自己<phoneme alphabet="py" ph="di">的</phoneme>爱情看得<prosody rate="0.8">太名贵了</prosody>，不肯随便施与。</s>
<s>现在呢，宛如做了好衣服，舍不得<break time="0.5"/>穿，锁在箱里，过一两年<prosody volume="77">忽然发见</prosody>这衣服的样子和花色都不时髦了，有些自怅自悔。</s></speak>`
  );
  return (
    <div className={clsx("", className)}>
      <SSMLEditor className="" text={text} onTextChange={setText} />

      <div className="mt-8">
        <p>SSML Content</p>
        <XMLViewer ssml={text} />
      </div>
    </div>
  );
}
