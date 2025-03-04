import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex justify-center flex-col items-center h-full gap-8 p-8">
      <img src="/images/incoming.webp" alt="404" className="md:max-w-[400px]" />
      <p className="text-2xl md:text-3xl font-bold text-center">Error 404</p>
      <p className="text-2xl md:text-3xl font-bold text-center">
        Trang bạn tìm không tồn tại hoặc đang trong quá trình phát triển
      </p>
      <Button asChild variant="default">
        <Link href="/">Quay lại trang chủ</Link>
      </Button>
    </div>
  );
}
