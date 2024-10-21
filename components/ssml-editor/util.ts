import { Editor, type Descendant } from "slate";
import { Node, Element, Text, Range } from "slate";

export const convertToPlainText = (value: Descendant[]) =>
  value.map((n) => Node.string(n)).join("");

export const serialize = (value: Descendant[]): string => {
  const text = value
    .map((node) => {
      if (Element.isElement(node) && node.type === "paragraph") {
        const children = node.children
          .map((child) => {
            if (Text.isText(child)) {
              let ssml = child.text;
              if ("breakTime" in child && child.breakTime) {
                ssml = `<break time="${child.breakTime}"/>`;
              }
              if ("phoneme" in child && child.phoneme) {
                ssml = `<phoneme alphabet="py" ph="${child.phoneme}">${ssml}</phoneme>`;
              }
              if ("rate" in child && child.rate) {
                ssml = `<prosody rate="${child.rate}">${ssml}</prosody>`;
              }
              return ssml;
            }
            return "";
          })
          .join("");
        return `<s>${children}</s>`;
      }
      return "";
    })
    .join("\n");

  const ssmlText = `<speak>${text}</speak>`;

  return isSSMLTextEmpty(ssmlText) ? "" : ssmlText;
};

export const deserialize = (str: string = ""): Descendant[] => {
  const defaultDescendants: Descendant[] = [{ type: "paragraph", children: [{ text: "" }] }];

  if (isSSMLTextEmpty(str)) return defaultDescendants;

  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(str, "application/xml");
  const speakElement = xmlDoc.documentElement;

  if (!speakElement) return defaultDescendants;

  const descendants: Descendant[] = [];
  const children = speakElement.children;
  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    if (child.nodeName === "s") {
      const paragraph: Descendant = {
        type: "paragraph",
        children: [],
      };
      const textNodes = child.childNodes;
      for (let j = 0; j < textNodes.length; j++) {
        const textNode = textNodes[j];

        if (textNode.nodeName === "break") {
          paragraph.children.push({
            text: "b",
            breakTime: (textNode as unknown as any).getAttribute("time"),
          });
        } else if (textNode.nodeName === "phoneme") {
          paragraph.children.push({
            text: textNode.textContent || "",
            phoneme: (textNode as any).getAttribute("ph"),
          });
        } else if (textNode.nodeName === "prosody") {
          paragraph.children.push({
            text: textNode.textContent || "",
            rate: +(textNode as any).getAttribute("rate"),
          });
        } else {
          paragraph.children.push({ text: textNode.textContent || "" });
        }
      }
      descendants.push(paragraph);
    }
  }

  return descendants;
};

/**
 * 判断SSML Text是否为空
 * @param text
 * @returns
 */
export const isSSMLTextEmpty = (text: string) => {
  if (text.length === 0) return true;
  if (text === "<speak><s></s></speak>") return true;
  return false;
};

/**
 * covert ssml to plain text
 * @param text
 * @returns
 */
export const getPlainText = (text: string = "") => {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(text, "application/xml");
  const speakElement = xmlDoc.documentElement;
  let plainText = "";

  if (speakElement) {
    const children = speakElement.children;
    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      if (child.nodeName === "s") {
        const textNodes = child.childNodes;
        for (let j = 0; j < textNodes.length; j++) {
          const textNode = textNodes[j];
          if (textNode.nodeName === "break") {
            plainText += "";
          } else if (textNode.nodeName === "phoneme") {
            plainText += textNode.textContent || "";
          } else {
            plainText += textNode.textContent || "";
          }
        }
      }
    }
  }

  return plainText;
};

export const getCurrentWords = (editor: Editor) => {
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
