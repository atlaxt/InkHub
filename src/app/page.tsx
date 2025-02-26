"use client";

import SEOHead from "@/components/SEOHead";
import { useState } from "react";
import { Slider } from "@heroui/react";
import { ColorPicker, useColor } from "react-color-palette";
import { Snippet } from "@heroui/snippet";
import { Image } from "@heroui/image";

import "react-color-palette/css";

export default function Home() {
  const [roundedValue, setRoundedValue] = useState(24);
  const [widthValue, setWidthValue] = useState(6);
  const [color, setColor] = useColor("#0b70e9");

  const tailwindClass = `border-[${widthValue}px] border-[${color.hex}] rounded-[${roundedValue / 2}%]`;

  const cssStyle = `
    border-width: ${widthValue}px;
    border-color: ${color.hex};
    border-radius: ${roundedValue / 2}%;
  `;

  return (
    <div className="relative flex lg:flex-row-reverse flex-col w-full h-full lg:p-8 lg:pt-0 p-2 py-12 gap-12 overflow-auto">
      <SEOHead />
      <div className="flex flex-col w-full h-full justify-center items-center gap-12">
        <div
          className="lg:w-64 lg:h-64 w-32 h-32"
          style={{
            borderRadius: `${roundedValue / 2}%`,
            borderWidth: `${widthValue}px`,
            borderColor: `${color.hex}`,
          }}
        />

        <div className="flex flex-col gap-6 w-8/12">
          <div className="flex flex-col">
            <label className="font-semibold"> {"tailwindcss"} </label>
            <Snippet
              color="primary"
              symbol=""
            ><label className="whitespace-normal"> {tailwindClass} </label></Snippet>
          </div>

          <div className="flex flex-col">
            <label className="font-semibold"> {"css"} </label>
            <Snippet
              color="primary"
              symbol=""
            ><pre> {cssStyle} </pre></Snippet>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-16 w-full h-full lg:justify-center lg:items-center">
        <Slider
          className="max-w-md"
          size="sm"
          value={roundedValue}
          onChange={(nw: number | number[]): void => {
            if (typeof nw === "number") setRoundedValue(nw);
          }}
          label="Rounded"
          maxValue={100}
          minValue={0}
          step={1}
        />

        <Slider
          className="max-w-md"
          size="sm"
          value={widthValue}
          onChange={(nw: number | number[]): void => {
            if (typeof nw === "number") setWidthValue(nw);
          }}
          label="Width"
          maxValue={100}
          minValue={0.1}
          step={0.1}
        />

        <div className="lg:w-[47%] w-full flex flex-col">
          <div className="flex w-full justify-between">
            <label> {"Color"} </label>
            <label> {color.hex} </label>
          </div>
          <ColorPicker hideInput color={color} onChange={setColor} />
        </div>
      </div>

      <a target="_blank" href="https://github.com/atlasyigitaydin" className="text-xs items-center flex flex-row gap-2 font-light fixed top-0 right-0 m-2">
        <p>{"atlasyigitaydin"}</p>
        <Image
          width={18}
          src="github.svg"
        />
      </a>

      <div className="fixed text-xs bottom-0 right-0 mr-1">
        v.0.0.1
      </div>
    </div>
  );
}
