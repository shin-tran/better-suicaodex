import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

type LocalNotification = {
  ids: string[];
};

const MAX_ITEMS = 500;

const limitArraySize = <T>(array: T[]): T[] => {
  if (array.length > MAX_ITEMS) {
    return array.slice(-MAX_ITEMS); // bỏ id cũ nhất
  }
  return array;
};

const localNotificationAtom = atomWithStorage<LocalNotification>(
  "local-notification",
  {
    ids: [],
  },
  {
    getItem: (key, initialValue) => {
      const storedValue = localStorage.getItem(key);
      if (!storedValue) return initialValue;

      try {
        const parsedValue = JSON.parse(storedValue) as LocalNotification;
        // Giới hạn kích thước của mảng khi lấy từ storage
        return {
          ids: limitArraySize(parsedValue.ids || []),
        };
      } catch {
        return initialValue;
      }
    },
    setItem: (key, value) => {
      // Giới hạn kích thước của mảng trước khi lưu vào storage
      const limitedValue = {
        ids: limitArraySize(value.ids),
      };

      localStorage.setItem(key, JSON.stringify(limitedValue));
    },
    removeItem: (key) => localStorage.removeItem(key),
  }
);

export function useLocalNotification() {
  const [localNotification, setLocalNotification] = useAtom(localNotificationAtom);

  // Thêm ID vào danh sách thông báo
  const addToLocalNotification = (id: string) => {
    setLocalNotification(current => {
      if (current.ids.includes(id)) return current;
      return {
        ids: [...current.ids, id],
      };
    });
  };

  // Xóa ID khỏi danh sách thông báo
  const removeFromLocalNotification = (id: string) => {
    setLocalNotification(current => ({
      ids: current.ids.filter(notificationId => notificationId !== id),
    }));
  };

  // Kiểm tra ID có trong danh sách thông báo không
  const isInLocalNotification = (id: string): boolean => {
    return localNotification.ids.includes(id);
  };

  // Xóa tất cả thông báo
  const clearAllLocalNotifications = () => {
    setLocalNotification({ ids: [] });
  };

  return {
    localNotification,
    addToLocalNotification,
    removeFromLocalNotification,
    isInLocalNotification,
    clearAllLocalNotifications,
    rawSetLocalNotification: setLocalNotification
  };
}
