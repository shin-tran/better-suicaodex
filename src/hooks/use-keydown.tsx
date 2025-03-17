import { useEffect } from "react";

type KeyCombination = {
  key?: string;
  ctrlKey?: boolean;
  altKey?: boolean;
  shiftKey?: boolean;
  metaKey?: boolean;
};

const useKeyDown = (
  keyCombination: string | KeyCombination,
  callback: () => void
) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (typeof keyCombination === "string") {
        // Handle simple key press
        if (event.key === keyCombination) {
          callback();
        }
      } else {
        // Handle key combination
        const matchesKey = !keyCombination.key || event.key === keyCombination.key;
        const matchesCtrl = keyCombination.ctrlKey === undefined || event.ctrlKey === keyCombination.ctrlKey;
        const matchesAlt = keyCombination.altKey === undefined || event.altKey === keyCombination.altKey;
        const matchesShift = keyCombination.shiftKey === undefined || event.shiftKey === keyCombination.shiftKey;
        const matchesMeta = keyCombination.metaKey === undefined || event.metaKey === keyCombination.metaKey;

        if (matchesKey && matchesCtrl && matchesAlt && matchesShift && matchesMeta) {
          callback();
          event.preventDefault();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [keyCombination, callback]);
};

export default useKeyDown;