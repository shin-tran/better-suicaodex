import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

type LocalLibrary = {
  follow: string[];
  plan: string[];
  reading: string[];
  completed: string[];
};

// Số lượng phần tử tối đa cho mỗi mảng
const MAX_ITEMS = 500;

// Hàm giới hạn số lượng phần tử của mảng
const limitArraySize = <T>(array: T[]): T[] => {
  if (array.length > MAX_ITEMS) {
    return array.slice(-MAX_ITEMS); // bỏ id cũ nhất
  }
  return array;
};

const configAtom = atomWithStorage<LocalLibrary>(
  "local-library",
  {
    follow: [],
    plan: [],
    reading: [],
    completed: [],
  },
  {
    getItem: (key, initialValue) => {
      const storedValue = localStorage.getItem(key);
      if (!storedValue) return initialValue;

      try {
        const parsedValue = JSON.parse(storedValue) as LocalLibrary;
        // Giới hạn kích thước của mỗi mảng khi lấy từ storage
        return {
          follow: limitArraySize(parsedValue.follow || []),
          plan: limitArraySize(parsedValue.plan || []),
          reading: limitArraySize(parsedValue.reading || []),
          completed: limitArraySize(parsedValue.completed || []),
        };
      } catch {
        return initialValue;
      }
    },
    setItem: (key, value) => {
      // Giới hạn kích thước của mỗi mảng trước khi lưu vào storage
      const limitedValue = {
        follow: limitArraySize(value.follow),
        plan: limitArraySize(value.plan),
        reading: limitArraySize(value.reading),
        completed: limitArraySize(value.completed),
      };

      localStorage.setItem(key, JSON.stringify(limitedValue));
    },
    removeItem: (key) => localStorage.removeItem(key),
  }
);

export function useLocalLibrary() {
  return useAtom(configAtom);
}
