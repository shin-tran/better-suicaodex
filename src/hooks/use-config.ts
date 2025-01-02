import { BaseColor } from "@/config/base-colors";
import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

type Config = {
  style: "new-york";
  theme: BaseColor["name"];
  radius: number;
  packageManager: "npm" | "yarn" | "pnpm" | "bun";
};

const configAtom = atomWithStorage<Config>("config", {
  style: "new-york",
  theme: "zinc",
  radius: 0.5,
  packageManager: "bun",
});

export function useConfig() {
  return useAtom(configAtom);
}
