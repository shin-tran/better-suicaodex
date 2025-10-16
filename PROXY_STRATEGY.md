# Chiến Lược Proxy API

## Tổng Quan

Hệ thống sử dụng 2 chiến lược proxy khác nhau:
1. **API Calls thông thường**: Xoay tua theo thứ tự ban đầu của danh sách proxy
2. **URL Ảnh**: Ưu tiên sử dụng proxy có Cloudflare cache (Nhóm 1)

## Danh Sách Proxy

### Nhóm 1: Có Cloudflare Cache (Ưu tiên cho ảnh)
- `https://api2.suicaodex.com`
- `https://api.suicaodex.com`

### Nhóm 2: Không có Cloudflare Cache
- `https://pr.memaydex.online`
- `https://proxy.bltx.workers.dev`
- `https://clf.suicaodex.com`

## Cơ Chế Hoạt Động

### 1. API Calls (`axiosWithProxyFallback`)
- Sử dụng thứ tự proxy: pr.memaydex → api2.suicaodex → proxy.bltx → api.suicaodex → clf.suicaodex
- Cache proxy thành công trong 1 phút
- Tự động fallback khi proxy hiện tại lỗi
- Set `currentWorkingApiUrl` khi request thành công (KHÔNG ảnh hưởng image URL)

### 2. URL Ảnh (`initImageProxy`)
- **Sử dụng biến riêng**: `currentImageProxyUrl` (tách biệt với `currentWorkingApiUrl`)
- Ưu tiên test Nhóm 1 trước (api2.suicaodex → api.suicaodex)
- Nếu Nhóm 1 lỗi hết, fallback sang Nhóm 2
- Tự động refresh mỗi 5 phút để đảm bảo dùng proxy tốt nhất
- Fallback về `api2.suicaodex.com` nếu tất cả đều lỗi
- **KHÔNG bị ghi đè** bởi `axiosWithProxyFallback`

## Cách Sử Dụng

### API Calls
```typescript
import { axiosWithProxyFallback } from "@/lib/axios";

const data = await axiosWithProxyFallback({ 
  url: "/manga", 
  method: "get" 
});
```

### URL Ảnh
```typescript
import { getCoverImageUrl } from "@/lib/utils";

// Tự động sử dụng proxy tốt nhất (đã được init)
const imageUrl = getCoverImageUrl(mangaId, fileName, "512");
```

### Refresh Image Proxy Thủ Công
```typescript
import { refreshImageProxy } from "@/lib/axios";

// Gọi khi phát hiện ảnh load lỗi
await refreshImageProxy();
```

## Khởi Tạo

Image proxy được tự động khởi tạo khi app load thông qua `ImageProxyInitializer` component trong `layout.tsx`.

## Lợi Ích

1. **Tối ưu cache**: Ảnh ưu tiên dùng proxy có Cloudflare cache → tải nhanh hơn
2. **Độ tin cậy cao**: Tự động fallback khi proxy lỗi
3. **Không ảnh hưởng code cũ**: `getCoverImageUrl` vẫn synchronous, không cần refactor
4. **Tự động refresh**: Định kỳ kiểm tra proxy tốt nhất mỗi 5 phút
5. **Tách biệt hoàn toàn**: Image proxy và API proxy dùng 2 biến riêng, không xung đột

## Chi Tiết Kỹ Thuật

### Biến State
- `currentWorkingApiUrl`: URL proxy cho API calls thông thường
- `currentImageProxyUrl`: URL proxy riêng cho ảnh (ưu tiên Cloudflare cache)

### Flow Hoạt Động
1. **App khởi động** → `ImageProxyInitializer` chạy → `initImageProxy()` → set `currentImageProxyUrl`
2. **API call** → `axiosWithProxyFallback()` → set `currentWorkingApiUrl` (KHÔNG ghi đè image proxy)
3. **Load ảnh** → `getCoverImageUrl()` → dùng `currentImageProxyUrl` (ổn định, không thay đổi)
4. **Sau 5 phút** → Refresh lại `currentImageProxyUrl` để đảm bảo proxy tốt nhất
