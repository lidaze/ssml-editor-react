// import { BaseText } from "./../../node_modules/slate/dist/interfaces/text.d";
import { BaseEditor } from "slate";
import { ReactEditor } from "slate-react";

// elements
export type ParagraphElement = {
  type: "paragraph";
  children: CustomText[];
};

export type CodeElement = {
  type: "code";
  children: CustomText[];
};

export type BreakTimeElement = {
  type: "breakTime";
  children: CustomText[];
};

// texts
export type FormattedText = {
  text: string;
  bold?: true;
  breakTime?: number; // 停顿
  phoneme?: string; // 发音
  phonemeOptions?: string[];
  rate?: number; // 局部变速
  volume?: number; // 局部音量
};

// using
export type CustomEditor = BaseEditor & ReactEditor;
export type CustomElement = ParagraphElement | CodeElement | BreakTimeElement;
export type CustomText = FormattedText;

declare module "slate" {
  interface CustomTypes {
    Editor: CustomEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}
