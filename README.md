![StSuicaoDex](https://github.com/user-attachments/assets/3c8805d1-7a61-49d4-9aa6-4bfae337c550)

> [suicaodex](https://github.com/TNTKien/suicaodex) vốn dĩ là 1 đống hổ lốn, better-suicaodex sinh ra để giải quyết đống hổ lốn đó (hoặc không 🐧).

> SuicaoDex chỉ xây dựng giao diện, trừ một số chức năng liên quan đến người dùng, mọi dữ liệu khác đều thuộc về MangaDex.

Như đã nói, SuicaoDex chỉ là 1 dự án "cho vui", phục vụ sở thích của cá nhân tôi, và tôi cũng chả cao siêu gì, nên nó sẽ không thể trọn vẹn như các web truyện chuyên nghiệp khác.

Tuy vậy, SuicaoDex sẽ luôn:
- Không quảng cáo & phi lợi nhuận.
- Tôn trọng nguồn dịch.
- Thân thiện với độc giả Việt Nam (cụ thể là tôi).

## Tiến độ
> UPDATE 30/03/2025: sắp tới sẽ tiến hành triển khai các chức năng liên quan đến người dùng (đăng nhập, đăng ký, lưu truyện...), nếu không cần những tính năng này, hãy chuyển sang nhánh [`no-auth`](https://github.com/TNTKien/better-suicaodex/tree/no-auth).

| Route | URL | suicaodex | better-suicaodex |
| --- | --- | :---: | :---: |
| Trang chủ | / | ✅ | ✅ |
| Tìm kiếm | | ✅ | ✅ |
| Tìm kiếm nâng cao | /advanced-search | ✅ | ✅ |
| Manga | /manga/:id | ✅ | ✅ |
| Chapter | /chapter/:id | ✅ | ✅ |
| Mới cập nhật | /latest | ✅ | ✅ |
| Lịch sử đọc | /history | ✅ | ✅ |
| Nhóm dịch | /groups | ✅ | ✅ |
| Chi tiết nhóm dịch | /group/:id | ✅ | ✅ |
| Đăng nhập |  | ✅ | ✅ |
| Thư viện | /my-library | ✅ | ☑️ (local) |
| Thông báo | /notifications | ⬛ | ☑️ (local) |
| Bình luận |  | ✅ | ⬛ |
| Built-in API | /api/mangadex/ | ✅ | ❌ |

> Loại bỏ built-in API vì tôi lười 👍

Ngoài ra còn cải thiện các chức năng cũ và thêm một số chức năng mới, sẽ cập nhật sau...

## Góp ý/Báo lỗi
Cần góp ý, thêm chức năng mới, báo lỗi hoặc bất cứ lý do gì bạn nghĩ ra được, hãy tìm tôi qua [Facebook](https://www.facebook.com/suicaodex), Discord: `@iam_neyk_7719`, hoặc tạo issue/pull request/discussion ngay trên repo này. Tôi rất hoan nghênh và thậm chí là khuyến khích cmn luôn, làm một mình oải vcl thề 🐧.

## Cài đặt

> Lưu ý: MangaDex API yêu cầu proxy, hãy tự tạo proxy mà dùng vì nếu bạn dùng của tôi thì tôi bị tốn thêm tiền.

>Bạn có thể tham khảo [suicaodex-api](https://github.com/TNTKien/suicaodex-api) hoặc proxy tích hợp sẵn trong [suicaodex cũ](https://github.com/TNTKien/suicaodex/blob/main/app/api/mangadex/%5B...path%5D/route.ts).

> Khi đã có proxy, hãy chỉnh sửa lại `src/config/site.ts` và `src/lib/axios.ts` cho phù hợp (có thể sẽ cần sửa thêm 1 số url ảnh).

> `.env`: SuicaoDex sử dụng [AuthJS](https://authjs.dev/), nhớ đọc kỹ docs để biết đường mà config, có thể tham khảo `example.env`.


Cài đặt các package cần thiết:
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

Chạy server dev:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Mở [http://localhost:3000](http://localhost:3000)
