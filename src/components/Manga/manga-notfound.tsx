import Link from "next/link";
import { buttonVariants } from "../ui/button";
import Banner from "./manga-banner";
import { cn } from "@/lib/utils";

export default function MangaNotFound() {
  return (
    <>
      <Banner src="/images/xidoco.webp" />
      <div className="flex flex-col gap-4">
        <div className="flex flex-row items-start gap-6">
          <img
            src="/images/xidoco.webp"
            alt="xidoco"
            className="w-[130px] md:w-[200px] h-auto rounded-sm drop-shadow-md shadow-md"
          />
        </div>

        <p className="uppercase font-black text-3xl drop-shadow-lg text-center">
          Truyện bạn đang tìm không tồn tại!
        </p>
        <Link
          href="/"
          className={cn(
            buttonVariants({ size: "lg", variant: "secondary" }),
            "text-lg"
          )}
        >
          Quay lại trang chủ
        </Link>
      </div>
    </>
  );
}
