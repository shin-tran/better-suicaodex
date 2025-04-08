import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import notFoundImg from "#/images/incoming.webp";
import doroThinkImg from "#/images/doro_think.webp";
import { ArrowRight, HomeIcon } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex justify-center flex-col items-center gap-8 p-8 max-w-4xl mx-auto animate-in fade-in duration-500">
      <div className="relative">
        <div className="animate-in zoom-in-95 duration-500">
          <Image
            src={notFoundImg}
            priority
            quality={100}
            alt="404"
            className="md:max-w-[400px]"
          />
        </div>
        <div className="absolute -bottom-8 -right-8 hidden md:block animate-in slide-in-from-bottom-4 fade-in duration-500 delay-300">
          <Image
            src={doroThinkImg}
            width={100}
            height={100}
            alt="Thinking"
            className="rounded-full border-4 border-background"
          />
        </div>
      </div>

      <div className="text-center max-w-2xl">
        <div className="animate-in slide-in-from-top-4 fade-in duration-500 delay-200">
          <p className="text-4xl font-bold text-primary mb-2">Error 404</p>
          <p className="text-2xl md:text-3xl font-bold mb-4">
            Trang bạn tìm không tồn tại hoặc đang trong quá trình phát triển
          </p>
          {/* <p className="text-muted-foreground mb-8">
            Có vẻ như trang bạn đang tìm kiếm đã bị di chuyển, xóa hoặc chưa được tạo. 
            Hãy thử quay lại trang chủ hoặc tìm kiếm nội dung khác.
          </p> */}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-in slide-in-from-bottom-4 fade-in duration-500 delay-400">
          <Button asChild>
            <Link href="/">
              <HomeIcon />
              Quay lại trang chủ
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/random">
              <ArrowRight />
              Truyện ngẫu nhiên
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
