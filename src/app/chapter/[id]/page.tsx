import Chapter from "@/components/Pages/Chapter/chapter";
import { getChapterDetail } from "@/lib/mangadex/chapter";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  //   try {
  //     const chapter = await getChapterDetail(id);
  //     console.log(chapter);
  //   } catch (error: any) {
  //     console.error(error);
  //   }
  return <Chapter id={id} />;
}
