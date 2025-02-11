import Link from "next/link";
import { Button, buttonVariants } from "../ui/button";
import Background from "./background";
import { cn } from "@/lib/utils";

export default function MangaNotFound() {
  return (
    <>
      <Background src="/xidoco.jpg" />
      <div className="flex flex-col gap-4">
        <div className="flex flex-row items-start gap-4">
          <img
            src="/xidoco.jpg"
            alt="xidoco"
            className="w-[130px] md:w-[200px] h-auto rounded-sm drop-shadow-md shadow-md"
          />
          <p className="uppercase font-black text-3xl md:text-5xl drop-shadow-lg md:text-white">
            Truyện không tồn tại
          </p>
        </div>

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
