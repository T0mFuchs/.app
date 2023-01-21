import React from "react";
// use dangerouslySetInnerHTML for content component to dynamically set tag with elem value

const handleElem = (elem: string) => {
  if (elem === "h1") return "h1 font-bold leading-4";
  if (elem === "h2") return "h2 font-bold leading-4";
  if (elem === "h3") return "h3 font-bold leading-4";
  if (elem === "p") return "p leading-4";
  if (elem === "ul") return "ul leading-4";
  if (elem === "ol") return "ol leading-4";
  if (elem === "li") return "li leading-4";
};

export default function Content({
  elem,
  text,
  key,
}: {
  elem: string;
  text: string;
  key?: React.Key;
}) {
  return (
    <>
      <div
        key={key}
        dangerouslySetInnerHTML={{
          __html: `<${handleElem(elem)}>${text}</${handleElem(elem)}>`,
        }}
      />
    </>
  );
}
