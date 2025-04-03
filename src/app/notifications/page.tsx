import { Metadata } from "next";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MonitorCog, NotepadText } from "lucide-react";
import { Alert } from "@/components/ui/alert";
import Notifications from "@/components/Notifications/notifications";
interface pageProps {
  searchParams: Promise<{
    [key: string]: string | undefined;
  }>;
}

export function generateMetadata(): Metadata {
  return {
    title: "Thông báo - SuicaoDex",
  };
}

export default async function Page({ searchParams }: pageProps) {
    const { page } = await getSearchParams({ searchParams });
  const tabValues = [
    {
      value: "noti",
      label: "Truyện",
      icon: <NotepadText size={16} className="mr-1" />,
    },
    {
      value: "system",
      label: "Hệ thống",
      icon: <MonitorCog size={16} className="mr-1" />,
    },
  ];
  return (
    <>
      <div>
        <hr className="w-9 h-1 bg-primary border-none" />
        <h1 className="text-2xl font-black uppercase">Thông báo</h1>
      </div>

      <Tabs defaultValue="noti" className="mt-4">
        <TabsList className="w-full">
          {tabValues.map((tab) => (
            <TabsTrigger
              key={tab.value}
              className="w-full flex items-center"
              value={tab.value}
            >
              {tab.icon}
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value="noti">
          <Notifications page={page} />
        </TabsContent>
        <TabsContent value="system">
          <Alert className="rounded-sm bg-secondary justify-center text-center">
            Không có thông báo nào!
          </Alert>
        </TabsContent>
      </Tabs>
    </>
  );
}

const getSearchParams = async ({ searchParams }: pageProps) => {
  const params = await searchParams;
  const page = params["page"] ? parseInt(params["page"]) : 1;

  return { page };
};
