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
};

const configAtom = atomWithStorage<Config>("config", {
  style: "new-york",
  theme: "zinc",
  radius: 0.5,
  packageManager: "bun",
  translatedLanguage: ["vi"],
  r18: false,
});

export function useConfig() {
  return useAtom(configAtom);
}
