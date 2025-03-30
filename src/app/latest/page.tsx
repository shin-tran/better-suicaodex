import Latest from "@/components/Pages/Latest";
import { Metadata } from "next";

interface pageProps {
  searchParams: Promise<{
    [key: string]: string | undefined;
  }>;
}

export async function generateMetadata({
  searchParams,
}: pageProps): Promise<Metadata> {
  const { page } = await getSearchParams({ searchParams });

  return {
    title:
      page === 1
        ? "Mới cập nhật - SuicaoDex"
        : `Trang ${page} - Mới cập nhật - SuicaoDex`,
    description: "Manga mới cập nhật",
    keywords: ["Mới cập nhật", "Manga"],
  };
}

export default async function Page({ searchParams }: pageProps) {
  const { page, limit } = await getSearchParams({ searchParams });
  return (
    <>
      <div>
        <hr className="w-9 h-1 bg-primary border-none" />
        <h1 className="text-2xl font-black uppercase">mới cập nhật</h1>
      </div>
      <div className="mt-4">
        <Latest page={page} limit={limit} />
      </div>
    </>
  );
}

const getSearchParams = async ({ searchParams }: pageProps) => {
  const params = await searchParams;

  const page = params["page"] ? parseInt(params["page"]) : 1;
  const limit = params["limit"] ? parseInt(params["limit"]) : 32;

  return {
    page,
    limit,
  };
};
