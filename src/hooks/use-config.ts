import { BaseColor } from "@/config/base-colors";
import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

type Config = {
  style: "new-york";
  theme: BaseColor["name"];
  radius: number;
  packageManager: "npm" | "yarn" | "pnpm" | "bun";
  translatedLanguage: ["vi"] | ["en"] | ["vi", "en"];
  r18: boolean;
  reader: {
    type: "single" | "long-strip";
    imageFit: "height" | "width";
    imageGap: number;
    header: boolean;
  };
};

const defaultConfig: Config = {
  style: "new-york",
  theme: "zinc",
  radius: 0.5,
  packageManager: "bun",
  translatedLanguage: ["vi"],
  r18: false,
  reader: {
    type: "long-strip",
    imageFit: "width",
    imageGap: 4,
    header: false,
  },
};

// const configAtom = atomWithStorage<Config>("config", {
//   style: "new-york",
//   theme: "zinc",
//   radius: 0.5,
//   packageManager: "bun",
//   translatedLanguage: ["vi"],
//   r18: false,
//   reader: {
//     type: "long-strip",
//     imageFit: "width",
//     imageGap: 4,
//     header: false,
//   },
// });

const configAtom = atomWithStorage<Config>("config", {
  ...defaultConfig,
  ...JSON.parse(localStorage.getItem("config") || "{}"),
});

export function useConfig() {
  return useAtom(configAtom);
}
